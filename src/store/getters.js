import face from '@/assets/face.gif'

export default {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  routes: state => state.app.routes,
  avatar: state => face
}
