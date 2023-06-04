import { DateRange } from 'react-date-range'

const DatePicker = ({value, handleSelect}) => {
  return (
    <DateRange
      rangeColors={['#F43F5E']}
      ranges={[value]}
      onChange={handleSelect}
      date={new Date()} /* //todo fix myb */
      direction='vertical'
      showDateDisplay={false}
      minDate={value.startDate}
      maxDate={value.endDate}
    />
  )
}

export default DatePicker