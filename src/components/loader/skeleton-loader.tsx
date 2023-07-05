type SkeletonLoaderProps = {};

export function SkeletonLoader({}: SkeletonLoaderProps) {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-3 w-48 rounded-full bg-gray-200"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
