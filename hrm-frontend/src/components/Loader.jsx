export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="pulse-loader"></div>
        <p className="mt-3 fw-semibold text-primary">Loading...</p>
      </div>
    </div>
  );
}
