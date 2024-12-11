// import React, { useEffect, useState } from "react";
// import { Box, Typography, Grid2 as Grid, Container, Paper } from "@mui/material";
// import StatsCards from "./StatsCards";
// //import axios from "../../services/api";
// import axios from "axios";
// import { Line } from "react-chartjs-2";

// export default function Home() {
//     const [weeklyStats, setWeeklyStats] = useState(null);
//     const userId = localStorage.getItem("userId"); // 从 Local Storage 获取用户 ID
  
//     useEffect(() => {
//       axios
//         .get(`/api/run-sessions/user/${userId}/all-stats`)
//         .then((response) => setWeeklyStats(response.data))
//         .catch((error) => console.error("Error fetching stats:", error));
//     }, [userId]);
  
//     if (!weeklyStats) {
//       return <Typography>Loading...</Typography>;
//     }
  
//     return (
//       <Container>
//         <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
//           Welcome Back!
//         </Typography>
//         <StatsCards stats={weeklyStats} />
  
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6">Weekly Summary</Typography>
//           <Paper elevation={3} sx={{ p: 2 }}>
//             <Typography variant="body1">
//               Total Distance: {weeklyStats.totalDistance || 0} km
//             </Typography>
//             <Typography variant="body1">
//               Total Time: {weeklyStats.totalTime || 0} hours
//             </Typography>
//             <Typography variant="body1">
//               Calories Burned: {weeklyStats.caloriesBurned || 0} kcal
//             </Typography>
//           </Paper>
//         </Box>
//       </Container>
//     );
//   }

import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper 
} from "@mui/material";
import StatsCards from "./StatsCards";
import axios from "axios";
import { Line } from "react-chartjs-2";

export default function Home() {
  const [weeklyStats, setWeeklyStats] = useState(null);
  const [rankingData, setRankingData] = useState(null);
  const [rankingLoading, setRankingLoading] = useState(false);
  const [rankingError, setRankingError] = useState(null);

  const userId = localStorage.getItem("userId");
  const startDate = "2022-01-01";
  const endDate = "2024-12-31";

  useEffect(() => {
    axios
      .get(`/api/run-sessions/user/${userId}/all-stats`)
      .then((response) => setWeeklyStats(response.data))
      .catch((error) => console.error("Error fetching stats:", error));
  }, [userId]);

  const fetchRankingData = () => {
    setRankingLoading(true);
    setRankingError(null);
    setRankingData(null);

    axios.get("/api/runtrack/top-runners", {
      params: {
        userId: userId,
        startDate: startDate,
        endDate: endDate
      }
    })
    .then((response) => {
      setRankingData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching ranking data:", error);
      setRankingError("Failed to fetch ranking data.");
    })
    .finally(() => {
      setRankingLoading(false);
    });
  };

  if (!weeklyStats) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
        Welcome Back!
      </Typography>
      <StatsCards stats={weeklyStats} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Weekly Summary</Typography>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="body1">
            Total Distance: {weeklyStats.totalDistance || 0} km
          </Typography>
          <Typography variant="body1">
            Total Time: {weeklyStats.totalTime || 0} hours
          </Typography>
          <Typography variant="body1">
            Calories Burned: {weeklyStats.caloriesBurned || 0} kcal
          </Typography>
        </Paper>

        {/* Ranking Button */}
        <Button variant="contained" onClick={fetchRankingData} disabled={rankingLoading}>
          {rankingLoading ? "Loading..." : "Ranking"}
        </Button>

        {/* Error Message */}
        {rankingError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {rankingError}
          </Typography>
        )}

        {/* Display Ranking Data if available */}
        {rankingData && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Top Runners</Typography>
            {rankingData.TopRunners && rankingData.TopRunners.length > 0 ? (
              <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                {rankingData.TopRunners.map((runner, index) => (
                  <Typography key={index} variant="body1">
                    {runner.FullName} (UserId: {runner.UserId}) - {runner.TotalDistance} km
                  </Typography>
                ))}
              </Paper>
            ) : (
              <Typography>No top runners data available.</Typography>
            )}

            <Typography variant="h6" sx={{ mt: 3 }}>Your Total Distance in the Selected Period</Typography>
            {rankingData.UserDistance && rankingData.UserDistance.length > 0 ? (
              <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                {rankingData.UserDistance.map((user, index) => (
                  <Typography key={index} variant="body1">
                    {user.FullName} (UserId: {user.UserId}) - {user.TotalDistance} km
                  </Typography>
                ))}
              </Paper>
            ) : (
              <Typography>No user distance data available.</Typography>
            )}

            <Typography variant="h6" sx={{ mt: 3 }}>Recent Purchases</Typography>
            {rankingData.RecentPurchases && rankingData.RecentPurchases.length > 0 ? (
              <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                {rankingData.RecentPurchases.map((purchase, index) => (
                  <Typography key={index} variant="body1">
                    {purchase.ProductName} (ID: {purchase.ProductId}) - {purchase.ProductPrice} USD
                  </Typography>
                ))}
              </Paper>
            ) : (
              <Typography>No recent purchase data available.</Typography>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
}