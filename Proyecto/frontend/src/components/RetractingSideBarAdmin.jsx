import { useState } from "react";
import { FiChevronsRight, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import { RiAdminLine } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import { BsCaretDownFill } from "react-icons/bs"; // Importar el icono de Bootstrap
import { GrUserManager } from "react-icons/gr";
import { AiOutlineAudit } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { MdOutlineGeneratingTokens } from "react-icons/md";

const RetractingSideBarAdmin = ({ setComponent }) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  const { user, logout } = useAuth(); // Moved inside the component
  //console.log(isAuthenticated, user);

  const handleComponentChange = (component) => {
    setSelected(component);
    setComponent(component);
  };

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2 overflow-visible" // Añade overflow-visible aquí
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection
        open={open}
        user={user}
        logout={logout}
        setSelected={handleComponentChange}
      />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={RiAdminLine}
          title="Administradores"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={GrUserManager}
          title="Gerente"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={AiOutlineAudit}
          title="Auditor"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={FaUserTie}
          title="Jefe contable"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={FaCalculator}
          title="Contadores"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={MdOutlineGeneratingTokens}
          title="Configuración token"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
      </div>

      {/* Aquí es donde añades un espacio entre las opciones 
      <div className="mt-4 md:mt-20 px-2 pb-4 space-y-2 md:space-y-1">
        <Option
          Icon={CgProfile}
          title="Perfil"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />

        <Option
          Icon={IoIosLogOut}
          title="Cerrar Sesión"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
          to="/"
          onClick={() => logout()}
        />
      </div>*/}

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
  to,
  onClick,
}) => {
  const isLogout = title === "Cerrar Sesión"; // Detecta si es la opción de logout
  const handleClick = () => {
    if (onClick) onClick(); // Ejecuta lógica adicional como logout
    setSelected(title); // Marca como seleccionado
  };

  const content = (
    <>
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}
      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </>
  );

  return isLogout ? (
    <Link
      to={to || "/"}
      onClick={handleClick}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      {content}
    </Link>
  ) : (
    <motion.button
      layout
      onClick={handleClick}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      {content}
    </motion.button>
  );
};

const TitleSection = ({ open, user, logout, setSelected }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar el dropdown

  const handleProfileClick = () => {
    setSelected("Perfil"); // Marca "Perfil" como seleccionado
    setDropdownOpen(false); // Cierra el dropdown
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Alterna el estado del dropdown
  };

  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div
        className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100"
        onClick={toggleDropdown} // Agregar el evento onClick aquí
      >
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">
                {user ? user.nombres : "Cargando..."}
              </span>

              <span className="block text-xs text-slate-500">
                {user?.cod_rol === 1 ? "Superusuario" : "Administrador"}
              </span>
            </motion.div>
          )}
        </div>
        {open && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-slate-500 hover:text-slate-700"
            >
              <BsCaretDownFill className="text-sm" />
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg border border-slate-200 z-50" // Añade z-50 aquí
              >
                <button
                  onClick={handleProfileClick}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <CgProfile className="inline-block mr-2" /> Perfil
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <IoIosLogOut className="inline-block mr-2" /> Cerrar Sesión
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-300"
    >
      <svg
        width="24"
        height="24" // Cambiado de "auto" a "24"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <circle cx="25" cy="15" r="7" fill="#2196F3" />
        <path
          d="M25 25C18.9249 25 14 29.9249 14 36V40H36V36C36 29.9249 31.0751 25 25 25Z"
          fill="#2196F3"
        />

        <path d="M35 10H40V15H35V10Z" fill="#FFC107" />
        <path
          d="M37.5 12.5C37.5 13.8807 36.3807 15 35 15C33.6193 15 32.5 13.8807 32.5 12.5C32.5 11.1193 33.6193 10 35 10C36.3807 10 37.5 11.1193 37 .5 12.5Z"
          fill="#FFC107"
        />
        <path
          d="M35 15V20"
          stroke="#FFC107"
          strokeWidth="2" // Cambiado de stroke-width a strokeWidth
          strokeLinecap="round" // Cambiado de stroke-linecap a strokeLinecap
        />

        <circle cx="25" cy="25" r="10" fill="#4CAF50" />
        <path
          d="M25 15L25 20"
          stroke="#FFFFFF"
          strokeWidth="2" // Cambiado de stroke-width a strokeWidth
          strokeLinecap="round" // Cambiado de stroke-linecap a strokeLinecap
        />
        <path
          d="M25 30L25 35"
          stroke="#FFFFFF"
          strokeWidth="2" // Cambiado de stroke-width a strokeWidth
          strokeLinecap="round" // Cambiado de stroke-linecap a strokeLinecap
        />
        <path
          d="M15 25L20 25"
          stroke="#FFFFFF"
          strokeWidth="2" // Cambiado de stroke-width a strokeWidth
          strokeLinecap="round" // Cambiado de stroke-linecap a strokeLinecap
        />
        <path
          d="M30 25L35 25"
          stroke="#FFFFFF"
          strokeWidth="2" // Cambiado de stroke-width a strokeWidth
          strokeLinecap="round" // Cambiado de stroke-linecap a strokeLinecap
        />
        <path
          d="M18 18L22 22"
          stroke="#FFFFFF"
          strokeWidth="2" // Cambiado de stroke-width a strokeWidth
          strokeLinecap="round" // Cambiado de stroke-linecap a strokeLinecap
        />
        <path
          d="M28 28L32 32"
          stroke="#FFFFFF"
          strokeWidth="2" // Cambiado de stroke-width a strokeWidth
          strokeLinecap="round" // Cambiado de stroke-linecap a strokeLinecap
        />
        <path
          d="M18 32L22 28"
          stroke="#FFFFFF"
          strokeWidth="2" // Cambiado de stroke-width a strokeWidth
          strokeLinecap="round" // Cambiado de stroke-linecap a strokeLinecap
        />
        <path
          d="M28 22L32 18"
          stroke="#FFFFFF"
          strokeWidth="2" // Cambiado de stroke-width a strokeWidth
          strokeLinecap="round" // Cambiado de stroke-linecap a strokeLinecap
        />
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Ocultar
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default RetractingSideBarAdmin;
