import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

/* Props type */
export type NotificationProps = {
  message: string;
  type: "success" | "error" | "warning" | "info";
  container: HTMLDivElement;
};

/* Component */
export default function NotificationComponent(props: NotificationProps): JSX.Element {
  /* UI states */
  const [alert, setAlert] = useState<"success" | "error" | "warning" | "info" | null>(props.type);
  const [timer] = useState(10);

  /* useEffect hooks */
  useEffect(() => {
    if (alert != null && timer !== 0) {
      const timerId: any = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timerId);
    } else if (alert === null || timer === 0) {
      document?.body?.removeChild(props.container);
    }
  }, [alert, timer, props.container]);

  /* Event handlers */
  const handleClose = (): void => {
    setAlert(null);
  };

  /* Get background color based on alert type */
  const getAlertColor = (type: "success" | "error" | "warning" | "info") => {
    switch (type) {
      case "success":
        return "#EA0A8C"; // Green for success
      case "error":
        return "#f44336"; // Red for error
      case "warning":
        return "#ff9800"; // Orange for warning
      case "info":
        return "#2196f3"; // Blue for info
      default:
        return undefined;
    }
  };

  return (
    <>
      {alert != null && (
        <Stack>
          <Alert
            style={{
              bottom: 10,
              right: 30,
              position: "fixed",
              zIndex: 2000,
              marginRight: "8px",
              display: "flex",
              alignItems: "start",
              backgroundColor: getAlertColor(props.type), // Apply dynamic background color
            }}
            severity={props?.type}
            variant="filled"
            onClose={handleClose}
          >
            <AlertTitle>{props?.type}</AlertTitle>
            {props.message}
          </Alert>
        </Stack>
      )}
    </>
  );
}
