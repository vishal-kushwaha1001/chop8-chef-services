// src/Components/Sidebar.jsx
import React from "react";
import styles from "./css/Sidebar.module.css";
import { Link } from "react-router";
import {
  FaHome, FaList, FaShoppingCart,
  FaClipboardList, FaCreditCard, FaUser,
} from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";

function Sidebar({
  open, setOpen, onLogout, ordersItem, isChef,
  username = "Customer Name",
  mobileN0 = "+91-0000000000",
  address  = "No address",
  email    = "xyz@gmail.com",
  photo    = "",          // ← NEW: base64 or URL profile photo
  avgRating = 0,
  ratingCount = 0,
}) {
  const menuItems = [
    { name: "Home",       path: "/",          icon: <FaHome /> },
    { name: "Services",   path: "/services",  icon: <FaList /> },
    ordersItem,
    ...(!isChef ? [{ name: "My Payments", path: "/payments", icon: <FaCreditCard /> }] : []),
    { name: "Contact Us", path: "/contactus", icon: <IoIosHelpCircle /> },
  ];

  const stars = Math.min(5, Math.max(0, Math.round(Number(avgRating) || 0)));

  return (
    <div
      className={`${styles.overlay} ${open ? styles.show : ""}`}
      onClick={() => setOpen(false)}
    >
      <div className={styles.sidebar} onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className={styles.close} onClick={() => setOpen(false)}>✕</button>

        {/* Profile header */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarRing}>
            {photo ? (
              <img src={photo} alt={username} className={styles.avatarImg} />
            ) : (
              <div className={styles.avatarFallback}>
                {isChef ? "👨‍🍳" : "👤"}
              </div>
            )}
          </div>

          <div className={styles.profileMeta}>
            <h3 className={styles.profileName}>{username}</h3>
            {isChef && (
              <span className={styles.roleBadge}>👨‍🍳 Chef Account</span>
            )}
            {ratingCount > 0 && (
              <div className={styles.ratingRow}>
                <span className={styles.stars}>
                  {"★".repeat(stars)}
                  <span className={styles.starsEmpty}>{"★".repeat(5 - stars)}</span>
                </span>
                <span className={styles.ratingNum}>
                  {Number(avgRating).toFixed(1)} ({ratingCount})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Contact info */}
        <div className={styles.contactBox}>
          {mobileN0 && mobileN0 !== "+91-0000000000" && (
            <div className={styles.contactRow}>
              <span className={styles.contactIcon}>📞</span>
              <span>{mobileN0}</span>
            </div>
          )}
          {email && email !== "xyz@gmail.com" && (
            <div className={styles.contactRow}>
              <span className={styles.contactIcon}>✉️</span>
              <span>{email}</span>
            </div>
          )}
          {address && address !== "No address" && (
            <div className={styles.contactRow}>
              <span className={styles.contactIcon}>📍</span>
              <span>{address}</span>
            </div>
          )}
        </div>

        {/* Edit Profile link */}
        <Link
          to="/profile"
          className={styles.editProfileBtn}
          onClick={() => setOpen(false)}
        >
          <FaUser style={{ fontSize: "12px" }} /> Edit Profile
        </Link>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Menu links */}
        <ul className={styles.menu}>
          {menuItems.filter(Boolean).map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                className={styles.menuLink}
                onClick={() => setOpen(false)}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button className={styles.logout} onClick={onLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;