import React from "react";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    SvgIcon,
} from "@mui/material";
const DashboardIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"></path>
        <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"></path>
        <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"></path>
        <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"></path>
    </SvgIcon>
);

const UserIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    </SvgIcon>
);

const VerificationIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M11.143 20.743a12 12 0 0 1 -7.643 -14.743a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3c.504 1.716 .614 3.505 .343 5.237"></path>
        <path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138"></path>
    </SvgIcon>
);

const CategoriesIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M13 5h8"></path>
        <path d="M13 9h5"></path>
        <path d="M13 15h8"></path>
        <path d="M13 19h5"></path>
        <path d="M3 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4"></path>
        <path d="M3 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4"></path>
    </SvgIcon>
);

const AttributeIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M9 6l11 0"></path>
        <path d="M9 12l11 0"></path>
        <path d="M9 18l11 0"></path>
        <path d="M5 6l0 .01"></path>
        <path d="M5 12l0 .01"></path>
        <path d="M5 18l0 .01"></path>
    </SvgIcon>
);

const VideoIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4"></path>
        <path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8"></path>
    </SvgIcon>
);

const AccessRolesIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
        <path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        <path d="M12 12l0 2.5"></path>
    </SvgIcon>
);

const StaffIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
        <path d="M6 21v-2a4 4 0 0 1 4 -4h2.5"></path>
        <path d="M17.001 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
        <path d="M19.001 15.5v1.5"></path>
        <path d="M19.001 21v1.5"></path>
        <path d="M22.032 17.25l-1.299 .75"></path>
        <path d="M17.27 20l-1.3 .75"></path>
        <path d="M15.97 17.25l1.3 .75"></path>
        <path d="M20.733 20l1.3 .75"></path>
    </SvgIcon>
);

const BannersIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M15 6l.01 0"></path>
        <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -8"></path>
        <path d="M3 13l4 -4a3 5 0 0 1 3 0l4 4"></path>
        <path d="M13 12l2 -2a3 5 0 0 1 3 0l3 3"></path>
        <path d="M8 21l.01 0"></path>
        <path d="M12 21l.01 0"></path>
        <path d="M16 21l.01 0"></path>
    </SvgIcon>
);

const LayoutIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M4 6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -1"></path>
        <path d="M4 15a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -3"></path>
        <path d="M14 6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -12"></path>
    </SvgIcon>
);

const WorldIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
        <path d="M3.6 9h16.8"></path>
        <path d="M3.6 15h16.8"></path>
        <path d="M11.5 3a17 17 0 0 0 0 18"></path>
        <path d="M12.5 3a17 17 0 0 1 0 18"></path>
    </SvgIcon>
);

const MapIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13"></path>
        <path d="M9 4v13"></path>
        <path d="M15 7v13"></path>
    </SvgIcon>
);

const FlareIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M12 3l3 6l6 3l-6 3l-3 6l-3 -6l-6 -3l6 -3l3 -6"></path>
    </SvgIcon>
);

const FileDescriptionIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"></path>
        <path d="M9 17h6"></path>
        <path d="M9 13h6"></path>
    </SvgIcon>
);

const FileDocIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
        <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"></path>
        <path d="M5 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1"></path>
        <path d="M20 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0"></path>
        <path d="M12.5 15a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1 -3 0v-3a1.5 1.5 0 0 1 1.5 -1.5"></path>
    </SvgIcon>
);

const BellIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
        <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
    </SvgIcon>
);

const LogoutIcon = (props) => (
    <SvgIcon
        {...props}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
            fill: 'none !important',
            stroke: 'currentColor !important',
            strokeWidth: '2 !important'
        }}
    >
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
        <path d="M9 12h12l-3 -3"></path>
        <path d="M18 15l3 -3"></path>
    </SvgIcon>
);

const Sidebar = ({ activeNavItem, handleNavItemClick }) => {
    const menuItemStyle = {
        height: 38,
        minHeight: 38,
        borderRadius: "8px",
        px: "16px",
        mx: "8px",
        my: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        transition: "background 0.2s ease",

        "& .MuiListItemIcon-root": {
            minWidth: 32,
            width: 32,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
        },

        "& .MuiSvgIcon-root": {
            fontSize: 22,
            color: "#2F2B3DE6",
        },

        "& .MuiListItemText-root": {
            margin: 0,
        },

        "& .MuiTypography-root": {
            fontSize: 15,
            lineHeight: "20px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "#2F2B3DE6",
        },
        "&:hover": {
            backgroundColor: "rgba(47, 43, 61, 0.04)",
        },
    };

    const activeStyle = {
        background: "var(--primary-color, #FF4C55)",
        boxShadow: "0px 2px 6px 0px rgba(var(--primary-color-rgb, 255, 76, 85), 0.3)",

        "& .MuiTypography-root": {
            color: "#fff",
            fontWeight: 500, // KEEP SAME weight as normal
        },

        "& .MuiSvgIcon-root": {
            color: "#fff",
            fontSize: 22,
        },
        "&:hover": {
            background: "var(--primary-color, #FF4C55)",
            opacity: 0.9,
        },
    };

    const sectionTitleStyle = {
        fontSize: "13px",
        fontWeight: 400,
        color: "#2F2B3D66",
        letterSpacing: "0.3px",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginTop: "24px",
        marginBottom: "10px",
        paddingLeft: "16px",
        paddingRight: "10px",
    };

    const items = [
        { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        {
            section: "CUSTOMER MANAGEMENT",
            links: [
                { label: "User", icon: <UserIcon />, path: "/users" },
                { label: "Verification", icon: <VerificationIcon />, path: "/verification" },
            ],
        },
        {
            section: "CATEGORY MANAGEMENT",
            links: [
                { label: "Categories", icon: <CategoriesIcon />, path: "/categories" },
                { label: "Attributes", icon: <AttributeIcon />, path: "/attributes" },
            ],
        },
        {
            section: "ADVERTISEMENT MANAGEMENT",
            links: [
                { label: "Ad Video", icon: <VideoIcon />, path: "/ad-video" },
            ],
        },
        {
            section: "PACKAGE MANAGEMENT",
            links: [
                { label: "Feature Advertisement", icon: <DashboardIcon />, path: "/feature-advertisement" },
            ],
        },
        {
            section: "STAFF MANAGEMENT",
            links: [
                { label: "Access Roles", icon: <AccessRolesIcon />, path: "/access-roles" },
                { label: "Staff", icon: <StaffIcon />, path: "/staff" },
            ],
        },
        {
            section: "HOME SCREEN MANAGEMENT",
            links: [
                { label: "Banners", icon: <BannersIcon />, path: "/banners" },
                { label: "Verification Fields", icon: <LayoutIcon />, path: "/verification-fields" },
            ],
        },
        {
            section: "LOCATION MANAGEMENT",
            links: [
                { label: "Nations", icon: <WorldIcon />, path: "/nations" },
                { label: "States", icon: <MapIcon />, path: "/states" },
                { label: "Cities", icon: <FlareIcon />, path: "/cities" },
            ],
        },
        {
            section: "REPORTS",
            links: [
                { label: "Report", icon: <FileDescriptionIcon />, path: "/report" },
                { label: "Report Reason", icon: <FileDocIcon />, path: "/report-reason" },
            ],
        },
        {
            section: "NOTIFICATIONS",
            links: [
                { label: "Send Notification", icon: <BellIcon />, path: "/send-notification" },
            ],
        },
        {
            section: "",
            links: [
                { label: "Logout", icon: <LogoutIcon />, path: "/login" },
            ],
        },
    ];

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#FFFFFF",
                padding: "10px 0",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                    width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#E5E7EB",
                    borderRadius: "4px",
                },
            }}
        >
            <List sx={{ padding: 0 }}>
                {items.map((item, idx) => {
                    if (item.section !== undefined) {
                        return (
                            <React.Fragment key={idx}>
                                {item.section && (
                                    <Typography sx={sectionTitleStyle}>
                                        {item.section}
                                    </Typography>
                                )}
                                {item.links.map((link) => (
                                    <ListItemButton
                                        key={link.path}
                                        onClick={() => handleNavItemClick(link.path)}
                                        disableRipple
                                        disableTouchRipple
                                        sx={{
                                            ...menuItemStyle,
                                            ...(activeNavItem === link.path && activeStyle),
                                        }}
                                    >
                                        <ListItemIcon>
                                            {link.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={link.label}
                                            primaryTypographyProps={{
                                                noWrap: true,
                                            }}
                                        />
                                    </ListItemButton>
                                ))}
                            </React.Fragment>
                        );
                    }
                    return (
                        <ListItemButton
                            key={item.path}
                            onClick={() => handleNavItemClick(item.path)}
                            disableRipple
                            disableTouchRipple
                            sx={{
                                ...menuItemStyle,
                                ...(activeNavItem === item.path && activeStyle),
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    noWrap: true,
                                }}
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </Box>
    );
};

export default Sidebar;
