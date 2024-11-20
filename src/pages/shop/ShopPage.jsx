import React, { useState, useEffect } from "react";
import {
  Grid as Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Pagination,
  Box,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

export default function ShopPage() {
  const [products, setProducts] = useState([]); // 商品数据
  const [page, setPage] = useState(1); // 当前页码
  const [totalPages, setTotalPages] = useState(1); // 总页数
  const [searchQuery, setSearchQuery] = useState(""); // 搜索关键词
  const [isSearching, setIsSearching] = useState(false); // 搜索状态

  useEffect(() => {
    // 加载当前页的商品数据
    if (!isSearching) {
      axios
        .get(`http://localhost:8080/products?page=${page - 1}`) // 注意后端分页从 0 开始
        .then((response) => {
          console.log("Fetched products:", response.data); // 调试日志
          setProducts(response.data); // 设置商品数据为直接返回的数据数组
          setTotalPages(1); // 暂时将总页数设为 1（后端返回的内容并未包含分页信息）
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [page, isSearching]);

  // 搜索功能
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      // 如果搜索为空，恢复为普通模式
      setIsSearching(false);
      setPage(1);
      return;
    }
    setIsSearching(true);
    axios
      .get(`http://localhost:8080/products/search?name=${searchQuery}`)
      .then((response) => {
        console.log("Search results:", response.data);
        setProducts(response.data);
        setTotalPages(1); // 搜索模式不需要分页
      })
      .catch((error) => console.error("Error searching products:", error));
  };

  // 分页切换
  const handlePageChange = (event, value) => {
    console.log("Switching to page:", value);
    setPage(value);
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
      </Box>

      {products.length > 0 ? ( // 确保 products 数据已加载
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/150" // 可替换为实际商品图片
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

      {/* 分页控件 */}
      {!isSearching && ( // 搜索模式下不显示分页
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
        />
      )}
    </Box>
  );
}
