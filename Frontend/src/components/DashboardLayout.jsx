import { useState } from "react";
import { X } from "lucide-react";

export function DashboardLayout({ children, menuItems, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#e6f0ff", display: "flex" }}>
      {/* Professional Sidebar */}
      <div
        style={{
          width: isOpen ? "300px" : "0",
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          borderRight: isOpen ? "1px solid #e2e8f0" : "none",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
          boxShadow: isOpen ? "12px 0 40px rgba(0,0,0,0.1)" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 1000,
        }}
      >
        {/* Sidebar Header */}
        <div style={{
          padding: "28px 24px",
          borderBottom: "1px solid #e2e8f0",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#1e293b",
                letterSpacing: "-0.5px",
                margin: 0,
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {title}
              </h2>
              <p style={{ fontSize: "12px", color: "#64748b", margin: 0, marginTop: "4px", fontWeight: "500" }}>
                Navigation Menu
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                border: "1px solid #cbd5e1",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)";
                e.currentTarget.style.borderColor = "#fca5a5";
                e.currentTarget.style.transform = "rotate(90deg) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.transform = "rotate(0deg) scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
              }}
            >
              <X size={20} strokeWidth={2.5} style={{ color: "#64748b" }} />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div style={{ padding: "20px 16px", overflowY: "auto", maxHeight: "calc(100vh - 120px)" }}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              style={{
                width: "100%",
                padding: "16px 20px",
                marginBottom: "8px",
                background: item.variant === "danger"
                  ? "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)"
                  : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                color: item.variant === "danger" ? "#dc2626" : "#1e293b",
                border: "2px solid",
                borderColor: item.variant === "danger" ? "#fca5a5" : "#e2e8f0",
                borderRadius: "14px",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "15px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (item.variant === "danger") {
                  e.currentTarget.style.background = "linear-gradient(135deg, #fca5a5 0%, #f87171 100%)";
                  e.currentTarget.style.borderColor = "#f87171";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(220, 38, 38, 0.25)";
                } else {
                  e.currentTarget.style.background = "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)";
                  e.currentTarget.style.borderColor = "#3b82f6";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(59, 130, 246, 0.15)";
                }
                e.currentTarget.style.transform = "translateX(8px)";
              }}
              onMouseLeave={(e) => {
                if (item.variant === "danger") {
                  e.currentTarget.style.background = "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)";
                  e.currentTarget.style.borderColor = "#fca5a5";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                } else {
                  e.currentTarget.style.background = "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                }
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: item.variant === "danger"
                  ? "rgba(220, 38, 38, 0.1)"
                  : "rgba(59, 130, 246, 0.1)",
                color: item.variant === "danger" ? "#dc2626" : "#3b82f6",
              }}>
                {item.icon}
              </div>
              <span style={{ letterSpacing: "0.2px", flex: 1 }}>{item.label}</span>
              <div style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: item.variant === "danger" ? "#dc2626" : "#3b82f6",
                opacity: 0.6,
              }} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: isOpen ? "300px" : "0",
          transition: "margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "100%",
        }}
      >
        {/* Professional Header with Hamburger */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 999,
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          {/* Professional Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "transparent",
              border: "none",
              borderRadius: "12px",
              padding: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              marginRight: "20px",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "26px",
              height: "20px",
              position: "relative",
            }}>
              {/* Top line */}
              <span style={{
                width: isOpen ? "100%" : "100%",
                height: "3px",
                background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
                borderRadius: "3px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isOpen ? "rotate(45deg) translateY(8px) translateX(1px)" : "rotate(0) translateY(0)",
                boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
                transformOrigin: "center",
              }} />
              {/* Middle line */}
              <span style={{
                width: "100%",
                height: "3px",
                background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
                borderRadius: "3px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: isOpen ? 0 : 1,
                transform: isOpen ? "translateX(10px)" : "translateX(0)",
                boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
              }} />
              {/* Bottom line */}
              <span style={{
                width: isOpen ? "100%" : "100%",
                height: "3px",
                background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
                borderRadius: "3px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isOpen ? "rotate(-45deg) translateY(-8px) translateX(1px)" : "rotate(0) translateY(0)",
                boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
                transformOrigin: "center",
              }} />
            </div>
          </button>

          {/* Title */}
          <h1 style={{
            fontSize: "22px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
            letterSpacing: "-0.4px"
          }}>
            {title}
          </h1>
        </div>

        {/* Content Area */}
        <div style={{ padding: "28px" }}>{children}</div>
      </div>

      {/* Enhanced Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            animation: "fadeIn 0.3s ease-out",
          }}
        />
      )}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
