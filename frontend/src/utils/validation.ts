// FIXME: 테스트 정규식 삭제
const passwordRegex = /.{6,}$/;
// const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const phoneRegex = /^01[016789]\d{7,8}$/;
const addressRegex = /^[가-힣0-9]+$/;
const nameRegex = /^[가-힣]{2,3}$/;

export { passwordRegex, phoneRegex, addressRegex, nameRegex };
