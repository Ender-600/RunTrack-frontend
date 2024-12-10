import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

export default function ShopPage() {
  const [products, setProducts] = useState([]); // 商品数据
  const [searchQuery, setSearchQuery] = useState(""); // 搜索关键词
  const [isSearching, setIsSearching] = useState(false); // 是否处于搜索状态

  useEffect(() => {
    if (!isSearching) {
      // 当不在搜索模式下，获取所有商品
      axios
        .get("http://localhost:8080/products")
        .then((response) => {
          console.log("Fetched products:", response.data);
          setProducts(response.data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [isSearching]);

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query === "") {
      // 如果搜索框为空，则显示全部商品
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    axios
      .get(`http://localhost:8080/products/search?name=${encodeURIComponent(query)}`)
      .then((response) => {
        console.log("Search results:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error("Error searching products:", error));
  };

  const handleClearSearch = () => {
    // 清空搜索结果并恢复全部商品
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Shop
      </Typography>

      {/* 搜索栏 */}
      <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        {isSearching && (
          <Button variant="outlined" color="secondary" onClick={handleClearSearch}>
            Clear
          </Button>
        )}
      </Box>

      {products && products.length > 0 ? (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/150"
                  alt={product.productName}
                />
                <CardContent>
                  <Typography variant="h6">{product.productName}</Typography>
                  <Typography variant="body1" color="primary">
                    ${product.productPrice.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No products found.</Typography>
      )}
    </Box>
  );
}
