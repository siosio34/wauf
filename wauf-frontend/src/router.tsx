import {
  Route,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import ProductPage from "./pages/ProductPage";
import SupplyChainDetailPage from "./pages/SupplyChainDetailPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="product" element={<ProductPage />} />
      <Route path="supply" element={<SupplyChainDetailPage />} />
    </Route>
  )
);

export default router;
