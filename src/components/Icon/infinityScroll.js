import React, { useEffect, useRef, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const elementRef = useRef(null);

  // Intersection Observer 콜백 함수와 useEffect를 활용한 코드는 이후에 추가.
  const onIntersection = (entries) => {
    const firstEntry = entries[0];

    // 첫 번째 entry가 화면에 나타나고 더 많은 데이터를 불러올 수 있는 상태(hasMore)인 경우 fetchMoreItems 함수를 호출.
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  };

  // 컴포넌트 렌더링 이후에 실행되며 Intersection Observer를 설정
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    //elementRef가 현재 존재하면 observer로 해당 요소를 관찰.
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // 컴포넌트가 언마운트되거나 더 이상 관찰할 필요가 없을 때(observer를 해제할 때)반환.
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasMore]);

  return <>{/* 상품 목록 및 무한 스크롤 요소 */}</>;
}

export default ProductList;
