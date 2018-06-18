import moment from 'moment'
import sortBy from 'lodash/sortBy'

const format = date => moment(date).format('DD/MM/YYYY HH:mm:ss')

const sortByDate = (list, property) => sortBy(list, item => moment(item[property]).valueOf())

const isToday = date => moment().isSame(moment(date), 'd')

export {
  format,
  isToday,
  sortByDate,
}
