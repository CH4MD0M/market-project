// CSS
import * as S from './style';

const UserChat = () => {
  return (
    <>
      <S.Checkbox id="check" />
      <S.ChatBtn htmlFor="check">
        <i className="bi bi-chat-dots comment"></i>
        <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle" />
        <i className="bi bi-x-circle close"></i>
      </S.ChatBtn>
      <S.ChatWrapper>
        <S.ChatHeader>
          <h6>Let's Chat - Online</h6>
        </S.ChatHeader>
        <S.ChatBody>
          <S.ChatMessage>
            {Array.from({ length: 20 }).map((_, idx) => (
              <div key={idx}>
                <p className="user-msg">
                  <b>나:</b> Hello, World!
                </p>

                <p className="bg-primary p-3 me-4 text-light">
                  <b>관리자:</b> Hello, World!!
                </p>
              </div>
            ))}
          </S.ChatMessage>
          <textarea
            id="clientChatMsg"
            className="form-control"
            placeholder="Your Text Message"
          ></textarea>
          <button className="btn btn-success btn-block">전송</button>
        </S.ChatBody>
      </S.ChatWrapper>
    </>
  );
};

export default UserChat;
