// 防抖函数
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// 节流函数
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// 格式化价格
export const formatPrice = (price) => {
  return `¥${price.toFixed(2)}`;
};

// 格式化销量
export const formatSales = (sales) => {
  if (sales >= 10000) {
    return `${(sales / 10000).toFixed(1)}万`;
  }
  return sales.toString();
};





