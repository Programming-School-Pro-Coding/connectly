import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ count }: { count: number }) => (
  <Skeleton count={count} />
);

export default SkeletonLoader;
