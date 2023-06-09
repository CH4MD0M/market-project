import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  *,
  ::after,
  ::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif; /* 1 */
    -ms-text-size-adjust: 100%; /* 2 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  body {
    font-family: 'Noto Sans KR';
    width: 100%;
    margin: 0 auto;
    overflow-x: auto;
    color: black;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }
  a {
    text-decoration: none;
    transition: 0.2s;

    &:focus {
      outline: none;
    }
    &:active,
    &:hover {
      outline: 0;
    }
  }

  h1 {
    font-size: 2rem;
    margin: 0.67rem 0;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sup {
    top: -0.5rem;
  }
  sub {
    bottom: -0.25rem;
  }
  img {
    border: 0;
  }
  /**
  * Correct overflow not hidden in IE 9/10/11.
  */
  svg:not(:root) {
    overflow: hidden;
  }
  figure {
    margin: 1rem 40px;
  }
  hr {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    height: 0;
  }
  code,
  kbd,
  pre,
  samp {
    font-family: 'Fira Code', monospace;
    font-weight: 400;
    font-size: 1rem;
  }
  pre {
    overflow: auto;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    color: inherit;
    font: inherit;
    margin: 0;
  }
  button {
    overflow: visible;
  }
  button,
  select {
    text-transform: none;
  }
  button,
  html input[type="button"], /* 1 */
  input[type="reset"],
  input[type="submit"] {
    -webkit-appearance: button; /* 2 */
    cursor: pointer; /* 3 */
  }
  button[disabled],
  html input[disabled] {
    cursor: default;
  }
  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  input {
    line-height: normal;
  }
  input[type='checkbox'],
  input[type='radio'] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    height: auto;
  }
  input[type='search'] {
    -webkit-appearance: textfield; /* 1 */
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box; /* 2 */
    box-sizing: content-box;
  }
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  textarea {
    overflow: auto;
  }
  optgroup {
    font-weight: bold;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  td,
  th {
    padding: 0;
  }
  ul {
    list-style: none;
  }
`;

export default GlobalStyles;
