import styled from "styled-components";

const Background = styled.div`
background: url('/media/img-11.jpg');
background-size: contain;
background-attachment: scroll;
transition: all 3ms ease-in-out;

&:hover section{
    background-color: rgb(154,152,207);
}
`

export default Background;