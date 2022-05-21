import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Restaurants from './components/admin/Restaurant/Restaurants';
import Banners from './components/admin/Banners';
import Category from './components/admin/Category';
import Customers from './components/admin/Customers';
import RestoDetails from './components/admin/Restaurant/RestoDetails';
import Orders from './components/admin/Orders';
import RestoItems from './components/admin/Restaurant/RestoItem';
import OrdersDetails from './components/admin/OrdersDetails';
import RestoModifier from './components/admin/Restaurant/RestoModifier';
import UpdateRestoDetail from './components/admin/Restaurant/updateRestoDetail';
import Deals from './components/admin/Deals/Deals';
import DealsDetails from './components/admin/Deals/dealsDetails';
import UpdateDeals from './components/admin/Deals/UpdateDeals';
import AddDeals from './components/admin/Deals/AddDeals';
function App() {
  return (
    <Switch>
      <Route path="/brud-admin" exact component={Login} />
      <Route path="/admin-profile" exact component={Profile} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/restaurants" exact component={Restaurants} />
      <Route path="/restaurantDetails" exact component={RestoDetails} />

      <Route path="/orders" exact component={Orders} />
      <Route path="/ordersDetails" exact component={OrdersDetails} />

      <Route path="/banners" exact component={Banners} />
      <Route path="/restaurantItems" exact component={RestoItems} />
      <Route path="/restaurantModifier" exact component={RestoModifier} />
      <Route
        path="/updateRestaurantDetails"
        exact
        component={UpdateRestoDetail}
      />

      <Route path="/category" exact component={Category} />
      <Route path="/customers" exact component={Customers} />
      <Route path="/deals" exact component={Deals} />
      <Route path="/dealsDetails" exact component={DealsDetails} />
      <Route path="/updateDeals" exact component={UpdateDeals} />
      <Route path="/addDeals" exact component={AddDeals} />
      <Redirect to="/brud-admin" />
    </Switch>
  );
}

export default App;
