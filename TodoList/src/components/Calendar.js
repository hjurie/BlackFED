import React, { Fragment } from 'react';
import moment from 'moment';
import Icon from 'react-icons-kit';
import { iosArrowLeft, iosArrowRight } from 'react-icons-kit/ionicons';
import styled from 'styled-components';

const Calendar = styled.div`
  width: 90%; margin: 0 auto; background-color: #312E36; overflow: hidden; user-select: none;
`;
const Controller = styled.div`
  position: relative; padding: 10px 0; color: #FFF; text-align: center; font-size: 1.4em; font-family: 'Roboto';
`;
const LeftArrow = styled.div`
  position: absolute; top: 50%; left: 10px; transform: translateY(-50%); cursor: pointer;
`;
const RightArrow = styled.div`
  position: absolute; top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;
`;
const Weeks = styled.div`
  width: 100%; border-top: 1px solid #242125; border-bottom: 1px solid #242125; overflow: hidden;
`;
const Week = styled.div`
  float: left; width: calc(100% / 7); height: 30px; line-height: 30px; font-size: .75em; text-align: center; color: #FFF;
`;
const Days = styled.div`
  & > div:nth-of-type(7n) { border-right: 0; color: #A29B97; }
  & > div:nth-of-type(7n - 6) { color: #A29B97; }
`;
const Day = styled.div`
  float: left; width: calc(100% / 7); height: 50px; padding: 5px; font-size: .85em; color: #FFF; border-bottom: 1px solid #242125; border-right: 1px solid #242125; cursor: pointer;
  &.today { color: #E9465B; font-weight: 600; }
  &.gray { color: #A29B97; }
  &.selected { background-color: #E9465B; color: #FFF; }
`;

const CalendarComponent = (props) => {
  const { date, deadline, onSelected } = props;
  
  const startWeek = moment(`${moment(date).format('YYYY-MM')}-01`, 'YYYY-MM-DD').day();
  const startDate = moment(date, 'YYYY-MM-DD').startOf('month').format('DD');
  const endDate = moment(date, 'YYYY-MM-DD').endOf('month').format('DD');
  const prevEndDate = moment(date).subtract(1, 'month').endOf('month').format('DD');
  
  const array = new Array(35).fill('');
  return (
    <Calendar>
      <Controller>
        <LeftArrow onClick={() => onSelected(`${moment(date).subtract(1, 'month').format('YYYY-MM')}-01`)}>
          <Icon size={20} icon={iosArrowLeft} />
        </LeftArrow>
        {moment(date).format('MMMM YYYY')}
        <RightArrow onClick={() => onSelected(`${moment(date).add(1, 'month').format('YYYY-MM')}-01`)}>
          <Icon size={20} icon={iosArrowRight} />
        </RightArrow>
      </Controller>
      <Weeks>
        <Week>일</Week>
        <Week>월</Week>
        <Week>화</Week>
        <Week>수</Week>
        <Week>목</Week>
        <Week>금</Week>
        <Week>토</Week>
      </Weeks>

      <Days>
        {
          array.map((item, index) => {

            let day = index + 1 - startWeek;
            let month = Number(moment(date).format('MM'));
            let year = Number(moment(date).format('YYYY'));
            let className = '';
            
            if(day < 1) { // 이전달
              month -= 1;
              if(month === 0) { month = 12; year -= 1; }
              day = day + Number(prevEndDate);
              className += ' gray';
            } else if(day > endDate) { // 다음달
              month += 1;
              if(month === 13) { month = 1; year += 1; }
              day = day - Number(endDate);
              className += ' gray';
            }

            const now = moment(`${year}-${month}-${day}`, 'YYYY-M-D').format('YYYY-MM-DD');
            if(moment().format('YYYY-MM-DD') === now) className += ' today';
            if(moment().format('YYYY-MM-DD') > now) className += ' gray';
            if(deadline === now) className += ' selected';
            

            return(<Day key={index} className={className} onClick={() => onSelected(now)}>{day}</Day>);
          })
        }
      </Days>
    </Calendar>
  );
};

export default CalendarComponent;