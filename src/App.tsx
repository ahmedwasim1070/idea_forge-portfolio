// Imports
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Components
import { Layout } from "@/components/layout";
// Pages
import { About, Home, NotFound, ProductDetail, Products, Support } from "@/pages";

// The legal pages pull in the markdown renderer, which is worth keeping out of
// the bundle everyone else downloads.
const Legal = lazy(() => import("@/pages/Legal"));

//
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          {/* Microsoft Store listings point directly at these. */}
          <Route
            path="products/:slug/:document"
            element={
              <Suspense fallback={<div className="min-h-screen" />}>
                <Legal />
              </Suspense>
            }
          />
          <Route path="about" element={<About />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
