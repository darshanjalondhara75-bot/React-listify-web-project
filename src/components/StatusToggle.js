import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import OnToggle from "./OnToggle";
import OffToggle from "./OffToggle";
import { CircularProgress, Box } from "@mui/material";

const StatusToggle = ({
  currentStatus,
  onToggle,
  activeStatus = 'live',
  inactiveStatus = 'danger',
  disabled = false
}) => {
  // Default undefined/null status to true (ON by default)
  const normalizedStatus = currentStatus ?? true;
  const [isOn, setIsOn] = useState(normalizedStatus === activeStatus || normalizedStatus === true);
  const [isLoading, setIsLoading] = useState(false);

  // Sync internal state when currentStatus prop changes
  useEffect(() => {
    const normalized = currentStatus ?? true;
    setIsOn(normalized === activeStatus || normalized === true);
  }, [currentStatus, activeStatus]);

  const handleToggle = async (e) => {
    // Prevent event bubbling to parent rows/elements
    if (e && e.stopPropagation) e.stopPropagation();

    if (disabled || isLoading) return;

    setIsLoading(true);
    try {
      const newStatus = isOn ? inactiveStatus : activeStatus;

      // Execute the onToggle callback if provided
      if (typeof onToggle === 'function') {
        // Support both sync and async callbacks
        await onToggle(newStatus);
      }

      setIsOn(!isOn);

      // Show notification based on the new status
      if (!isOn) { // Switching to ON
        toast.success("Activated Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      } else { // Switching to OFF
        toast.error("Deactivated Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error in handleToggle:', error);
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        width: 32, // Match toggle width
        height: 18, // Match toggle height
        overflow: 'visible'
      }}
    >
      {isLoading ? (
        <CircularProgress size={16} thickness={6} color="inherit" />
      ) : (
        <Box onClick={handleToggle} sx={{ cursor: 'pointer', display: 'flex' }}>
          {isOn ? (
            <OnToggle />
          ) : (
            <OffToggle />
          )}
        </Box>
      )}
    </Box>
  );
};

export default StatusToggle;

