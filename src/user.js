import GUN from 'gun'
import 'gun/sea'
// import 'gun/axe';

localStorage.clear()
export const db = GUN()
export const user = db.user().recall({sessionStorage: true})
