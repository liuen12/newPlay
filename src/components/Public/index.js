import SearchBox from './SearchBox'
import PublicTable from './PublicTable'
import PopoverBox from './PopoverBox'
import Pagination from './Pagination'
import RecursiveTable from './RecursiveTable'
import DialogBox from './DialogBox'
import DialogText from './DialogText'
import DialogTable from './DialogTable'

const Publics = {
  install: function (Vue) {
    Vue.component('SearchBox', SearchBox)
    Vue.component('PublicTable', PublicTable)
    Vue.component('PopoverBox', PopoverBox)
    Vue.component('Pagination', Pagination)
    Vue.component('RecursiveTable', RecursiveTable)
    Vue.component('DialogBox', DialogBox)
    Vue.component('DialogText', DialogText)
    Vue.component('DialogTable', DialogTable)
  }
}
const Public = {...Publics}
export default Public
