"use client";

import { forwardRef } from "react";

const Container = forwardRef(function Container(
  { 
    children, 
    className = "", 
    as: Component = "div",
    maxWidth = "7xl",
    padding = true,
    ...props 
  },
  ref
) {
 
  const maxWidthClasses = {
    "sm": "max-w-screen-sm",
    "md": "max-w-screen-md",
    "lg": "max-w-screen-lg",
    "xl": "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    "7xl": "max-w-7xl",
    "full": "max-w-full",
    "none": "",
  };

  const maxWidthClass = maxWidthClasses[maxWidth] || maxWidthClasses["7xl"];
  const paddingClasses = padding ? "px-4 sm:px-6 lg:px-8" : "";

  return (
    <Component
      ref={ref}
      className={`
        mx-auto w-full
        ${maxWidthClass}
        ${paddingClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Container;