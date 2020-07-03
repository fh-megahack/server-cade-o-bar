import express, { Router } from 'express'

// API`s
import BarApi from './api/Bar/BarApi'
import DiscoveryApi from './api/Discovery/DiscoveryApi'
import FavoriteApi from './api/Favorite/FavoriteApi'
import PointApi from './api/Point/PointApi'
import ProductApi from './api/Product/ProductApi'
import RatingApi from './api/Rating/RatingApi'
import UserApi from './api/User/UserApi'

const routes: Router = express.Router()

BarApi(routes)
DiscoveryApi(routes)
FavoriteApi(routes)
PointApi(routes)
ProductApi(routes)
RatingApi(routes)
UserApi(routes)

export default routes