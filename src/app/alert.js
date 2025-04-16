export const alertTypes = [
    { name: "Phishing Email", severity: "high" },
    { name: "Suspicious Login", severity: "high" },
    { name: "Malware Detected", severity: "critical" },
    { name: "Unusual Network Traffic", severity: "medium" },
    { name: "Password Attempt Failed", severity: "low" },
    { name: "Data Exfiltration", severity: "critical" },
    { name: "Privilege Escalation", severity: "high" },
    { name: "Suspicious File Download", severity: "medium" },
    { name: "Unauthorized Access", severity: "high" },
    { name: "Configuration Change", severity: "low" },
  ];
  
  
  export const generateRandomAlert = () => {
    const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const timestamp = new Date().toISOString();
    return {
      id: `alert-${Math.random().toString(36).substring(2, 9)}`,
      type: randomType.name,
      severity: randomType.severity,
      timestamp,
      source: `src-${Math.floor(Math.random() * 100)}`,
    };
  };
  
  export const generateAlerts = (count) => {
    return Array(count).fill(0).map(() => generateRandomAlert());
  };
  
  export const initialWithoutSimbianCounts = {
    ignoredAlerts: 200,
    wronglyClosed: 35,
    activeThreats: 5,
  };
  
  export const withoutSimbianContentLines = [
    "Wasting valuable analyst time on false positives",
    "Processing one alert at a time, missing the big picture",
    "More time fixing SOAR automation, less time on real threats",
  ];
  
  export const withSimbianSummaries = [
    "90% of alerts resolved automatically, 24/7",
    "Correlates alerts to your environment into the big picture",
    "Investigate every alert—no SOAR needed",
    "AI-powered triage with human oversight"
  ];