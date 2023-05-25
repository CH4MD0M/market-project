import React, { useEffect, useState } from 'react';

import { Col, Form, Row } from 'react-bootstrap';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import AdminLayout from '@layout/AdminLayout';

import { getAnalyticsDataByDate } from '@utils/api/analyticsApi';
import { socket } from '@/utils/constants/socket';

interface Dataset {
  name: string;
  [date: string]: string | number;
}

const Analytics = () => {
  const [firstDateToCompare, setFirstDateToCompare] = useState(
    new Date().toISOString().substring(0, 10),
  );

  let previousDay = new Date();
  previousDay.setDate(previousDay.getDate() - 1);
  const [secondDateToCompare, setSecondDateToCompare] = useState(
    new Date(previousDay).toISOString().substring(0, 10),
  );

  const [dataForFirstSet, setDataForFirstSet] = useState([]);
  const [dataForSecondSet, setDataForSecondSet] = useState([]);

  console.log(dataForFirstSet, dataForSecondSet);

  // onChange handler
  const firstDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstDateToCompare(e.target.value);
  };
  const secondDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondDateToCompare(e.target.value);
  };

  useEffect(() => {
    let today = new Date().toDateString();

    const updateData = (
      newOrder: OrderDataForAdmin,
      dateToCompare: string,
      setData: React.Dispatch<React.SetStateAction<Dataset[]>>,
    ) => {
      const orderDate = new Date(newOrder.createdAt).toLocaleString('ko-KR', {
        hour: 'numeric',
        hour12: true,
        timeZone: 'UTC',
      });
      setData(prev => {
        if (prev.length === 0) {
          return [
            {
              name: orderDate,
              [dateToCompare]: newOrder.orderTotal.cartSubtotal,
            },
          ];
        }

        const lastItemIndex = prev.length - 1;
        if (prev[lastItemIndex].name === orderDate) {
          prev[lastItemIndex][dateToCompare] =
            (prev[lastItemIndex][dateToCompare] as number) + newOrder.orderTotal.cartSubtotal;
          return [...prev];
        } else {
          const lastElem = {
            name: orderDate,
            [dateToCompare]:
              (prev[lastItemIndex][dateToCompare] as number) + newOrder.orderTotal.cartSubtotal,
          };
          return [...prev, lastElem];
        }
      });
    };

    const handler = (newOrder: OrderDataForAdmin) => {
      if (new Date(newOrder.createdAt).toDateString() === today) {
        if (today === new Date(firstDateToCompare).toDateString()) {
          updateData(newOrder, firstDateToCompare, setDataForFirstSet);
        } else if (today === new Date(secondDateToCompare).toDateString()) {
          updateData(newOrder, secondDateToCompare, setDataForSecondSet);
        }
      }
    };

    socket.on('newOrder', handler);
    return () => {
      socket.off('newOrder', handler);
    };
  }, [setDataForFirstSet, setDataForSecondSet, firstDateToCompare, secondDateToCompare]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchAnalyticsData = async (selectedDate: string, setData: Function) => {
      try {
        const data: OrderDataForAdmin[] = await getAnalyticsDataByDate(
          selectedDate,
          abortController.signal,
        );
        let orderSum = 0;
        const orders = data.map(order => {
          orderSum += order.orderTotal.cartSubtotal;
          const date = new Date(order.createdAt).toLocaleString('ko-KR', {
            hour: 'numeric',
            hour12: true,
            timeZone: 'UTC',
          });
          return { name: date, [selectedDate]: orderSum };
        });
        setData(orders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnalyticsData(firstDateToCompare, setDataForFirstSet);
    fetchAnalyticsData(secondDateToCompare, setDataForSecondSet);

    return () => abortController.abort();
  }, [firstDateToCompare, secondDateToCompare]);

  return (
    <AdminLayout>
      <h1>통계</h1>
      <Row className="justify-content-md-center mt-5">
        <Col>
          <Form.Group controlId="firstDateToCompare">
            <Form.Label>날짜 선택</Form.Label>
            <Form.Control
              type="date"
              name="firstDateToCompare"
              placeholder="First Date To Compare"
              defaultValue={firstDateToCompare}
              onChange={firstDateHandler}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="secondDateToCompare">
            <Form.Label>비교 날짜 선택</Form.Label>
            <Form.Control
              type="date"
              name="secondDateToCompare"
              placeholder="Second Date To Compare"
              defaultValue={secondDateToCompare}
              onChange={secondDateHandler}
            />
          </Form.Group>
        </Col>
      </Row>
      <br />

      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{ value: '시간', offset: 50, position: 'insideBottomRight' }}
            allowDuplicatedCategory={false}
          />
          <YAxis>
            <Label value="수익 :천원" offset={0} angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={4}
            data={dataForFirstSet}
            dataKey={firstDateToCompare}
          />
          <Line
            type="monotone"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            strokeWidth={4}
            data={dataForSecondSet}
            dataKey={secondDateToCompare}
          />
        </LineChart>
      </ResponsiveContainer>
    </AdminLayout>
  );
};

export default Analytics;
