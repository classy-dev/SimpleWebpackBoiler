import { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import routes from './routes';


function AppRoutes() {
  const element = useRoutes(routes);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {element}
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
