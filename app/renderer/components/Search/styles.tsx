import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  top: 0;

  height: 80px;
  width: 100%;
`

export const TextOverlayGradient = styled.div`
  position: absolute;

  width: 60px;
  height: 100%;
  background-image: linear-gradient(to right, #ffffff 20%, rgba(255, 255, 255, 0));
`

export const Input = styled.input`
  display: block;
  float: left;

  width: calc(100% - 80px);
  height: 80px;

  border: 0;
  padding-right: 18px;
  box-sizing: border-box;
  line-height: 900px;

  text-align: center;
  font-size: 36px;
  outline: none;

  transition: box-shadow .3s ease;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);

  :hover {
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  }

  :focus {
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
  }

  ::placeholder {
    color: #aaa;
  }
`

export const Button = styled.div`
  float: left; 

  width: 80px;
  height: 100%;

  background: #111;
  color: white;

  background-image: url(icons/search.svg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 30px;

  cursor: pointer;

  transition: all .1s ease;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);

  :hover {
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);
    background-size: 32px;
  }

  :active {
    background-size: 28px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
  }
`

export const Result = styled.div`
  width: 420px;
  height: 100px;

  margin: ${(p: { first: boolean }) => p.first ? '100px' : '16px'} auto 16px;
  padding: 6px 0;
  box-sizing: border-box;

  background: white;
  cursor: pointer;

  transition: box-shadow .2s ease;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);

  :hover {
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  }

  :active {
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:last-of-type {
    margin: 16px auto 160px;
  }
`

export const Thumbnail = styled.div`
  float: left;

  width: 88px;
  height: 88px;

  margin: 0 6px;
  background-image: url('${(p: { thumb: string }) => p.thumb}');
`

export const Title = styled.div`
  float: left;

  height: 100%;
  width: 314px;

  font-size: 24px;

  box-sizing: border-box;
  padding: 0 12px;
  display: flex;
  align-items: center;
`
