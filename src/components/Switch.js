import  React, { useContext} from 'react';
import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import { TableContext } from '../provider/TableProvider'  
const blue = {
  500: '#2eca45',
};

const grey = {
  400: '#BFC7CF',
  500: '#AAB4BE',
};

const Root = styled('span')`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 0 10px 0 10px ;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${grey[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 22px;
      top: 3px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${blue[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
`;

export default function UnstyledSwitches(props) {
  const label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } }; 
  const tableContext = useContext(TableContext)
  return (
    <div className="d-flex justify-content-start align-items-center mb-3">
      <SwitchUnstyled 
        value = { props.title}
        component={Root} {...label} 
        defaultChecked 
        onChange= {()=> { 
          const items = tableContext.columnSearch.find(item => item ===props.title);  
          items &&  tableContext.setColumnSearch(tableContext.columnSearch.filter((item) => item  !== props.title)); 
          !items && tableContext.setColumnSearch(prev => [...prev,props.title])  
          tableContext.setSearchFillter(tableContext.searchFiller.filter(val => !tableContext.columnSearch.includes(val))) 
        }}
      /> 
      <p className="mb-0" style={{color:"#fff"}}>{props.title}</p>
    </div>
  );
}