import styled from "styled-components"

export default styled.button<{ color?: string }>`
  background: 0;
  width: 24px;
  height: 24px;
  border: 0;
  padding: 0;
  cursor: pointer;

  :before, :after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 18px;
    height: 0px;
    transform: translate(-50%, -50%) rotate(45deg);
    border: 0.5px solid ${p => p.color ? p.color : 'black'};
    border-radius: 0.5px;
    transition: all 333ms ease;
  }
  
  :after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`
