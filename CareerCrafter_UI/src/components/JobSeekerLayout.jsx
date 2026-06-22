import NavbarJobSeeker from "./NavbarJobSeeker";

const JobSeekerLayout = ({ children }) => {
  return (
    <div className="d-flex bg-light min-vh-100">
      <NavbarJobSeeker />
      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        {children}
      </div>
    </div>
  );
};

export default JobSeekerLayout;
