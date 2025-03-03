import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Header from "../components/NavHeader";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
