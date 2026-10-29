// Swap these for real navigation later. Keep them module-level so
// their identity never changes and memoized children don't re-render.
export const handleAddSubscription = () => console.log("Add subscription");
export const handleViewAllUpcoming = () => console.log("View all upcoming");
export const handleViewAllSubscriptions = () =>
  console.log("View all subscriptions");
export const handleSelect = (name: string) => console.log("Selected:", name);
