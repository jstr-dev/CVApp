import React from "react";

export default function SkeletonBlock() {
    return (
        <div className="flex flex-col p-2 w-full gap-2 ContentPanel rounded-lg">
        {/* Image skeleton */}
        <div className="w-full h-40 skeleton-line rounded-lg"></div>
  
        {/* Title skeleton */}
        <div className="h-4 skeleton-line rounded-md mt-2"></div>
  
        {/* Date skeleton */}
        <div className="flex flex-row mt-6 justify-between items-center">
          <div className="h-4 w-24 skeleton-line rounded-md"></div>
  
          {/* Action buttons skeleton */}
          <div className="flex gap-2">
            <div className="h-6 w-6 skeleton-line rounded-md"></div>
            <div className="h-6 w-6 skeleton-line rounded-md"></div>
          </div>
        </div>
      </div>
    );
}