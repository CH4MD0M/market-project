interface Category {
  _id: string;
  name: string;
  description: string;
  image: any;
  attrs: any;
}

interface AttrsData {
  key: string;
  val: string;
  categoryChoosen: string;
}
