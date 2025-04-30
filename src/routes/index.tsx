import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// 웹팩의 require.context를 사용하여 pages 디렉토리의 모든 파일을 가져옵니다
const pages = (require as any).context('../pages', true, /\.tsx$/);

interface PageComponent {
  default: React.ComponentType;
  meta?: {
    title: string;
  };
}

function createRoutes(): RouteObject[] {
  const routes: RouteObject[] = [];
  
  pages.keys().forEach((path: string) => {
    // 파일 경로에서 확장자를 제거하고 실제 라우트 경로로 변환
    const normalizedPath = path
      .replace(/^\.\//, '')
      .replace(/\.tsx$/, '');
    
    // 중첩 라우트 처리
    const pathSegments = normalizedPath.split('/');
    
    if (pathSegments.length === 1) {
      // 최상위 라우트
      let routePath;
      if (pathSegments[0].toLowerCase() === 'index' || pathSegments[0].toLowerCase() === 'home') {
        routePath = '/';
      } else if (pathSegments[0] === 'Item') {
        routePath = '/item/:id';  // 동적 라우트
      } else {
        routePath = `/${pathSegments[0]}`;
      }
      
      const Component = lazy(() => import(`../pages/${normalizedPath}`) as Promise<PageComponent>);
      routes.push({
        path: routePath,
        element: <Component />,
      });
    } else {
      // 중첩 라우트
      const parentSegment = pathSegments[0];
      const childSegment = pathSegments[1];
      
      // 부모 라우트 찾기 또는 생성
      let parentRoute = routes.find(r => r.path === `/${parentSegment}`);
      if (!parentRoute) {
        const ParentComponent = lazy(() => import(`../pages/${parentSegment}/index`) as Promise<PageComponent>);
        parentRoute = {
          path: `/${parentSegment}`,
          element: <ParentComponent />,
          children: [],
        };
        routes.push(parentRoute);
      }
      
      if (childSegment !== 'index') {
        const Component = lazy(() => import(`../pages/${normalizedPath}`) as Promise<PageComponent>);
        parentRoute.children = parentRoute.children || [];
        parentRoute.children.push({
          path: childSegment,
          element: <Component />,
        });
      }
    }
  });
  
  return routes;
}

const routes = createRoutes();
export default routes;
