import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import "./style.css";
import { Button, Container, Card, CardContent, CardMedia, Typography, Grid, Box } from "@mui/material";

const Home = () => {
   const dispatch = useDispatch();

   const teaProducts = [
      {
         id: 1,
         title: "Green Tea Bliss",
         description: "Experience the serene flavor of our premium Green Tea Bliss. Rich in antioxidants, this tea promotes health and wellness with every sip.",
         imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqDhl4NLhMIX_FCpluvYy44cGfZDP3t4worw&s"
      },
      {
         id: 2,
         title: "Chamomile Calm",
         description: "Unwind with our Chamomile Calm tea. Known for its soothing properties, this tea is perfect for relaxing after a long day.",
         imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ngggPC_1hfXxT2g0hi5iKVTp1g2-4KjxqQ&s"
      },
      {
         id: 3,
         title: "Earl Grey Elegance",
         description: "Indulge in the classic taste of our Earl Grey Elegance. Infused with bergamot, this tea offers a refreshing and aromatic experience.",
         imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo3Ps9yLLlhwV1wP0eVaiumlqGwCXQtpC2sw&s"
      }
   ];

   useEffect(() => {
      dispatch(fetchProducts());
   }, [dispatch]);

   const welcomeNote = (
      <Typography variant="h4" gutterBottom sx={{
         marginBottom: "22%",
         marginTop: "12%",
         fontFamily: "poppins",
         fontSize: '40px',
         color: "#D6D5CA"  // Make the text white
      }}>
         Welcome to <span style={{
            fontSize: "85px", color: 'white', fontWeight: "bold",
            textShadow: "4px 4px 25px grey",
         }}> GreenNest </span>
      </Typography>
   );

   return (
      <div>
         <div style={{
            backgroundImage: `url('https://www.marthastewart.com/thmb/RFXrMCdRQfHyjOBbb6lAuQ-x2JQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/houseplants-getty-0820-226e798aabf040edb584602e2c5dfd3b.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative', // Position relative for the gradient overlay
         }}>
            <div style={{
               position: 'absolute', // Position the gradient overlay
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               background: 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3))', // Dark gradient from left to right
               zIndex: 1 // Ensure the overlay is above the background image
            }} />
            <Container maxWidth="xl" style={{
               minHeight: '100vh',
               display: 'flex',
               alignItems: 'left',
               justifyContent: 'space-between',
               position: 'relative', // Position relative for the text
               zIndex: 2 // Ensure the text is above the gradient overlay
            }}>
               <div style={{ width: "40%" }}>
                  <div style={{ marginLeft: '50px' }}>
                  </div>{welcomeNote}
                  <div>
                     <Typography variant="body1" paragraph sx={{
                        fontFamily: "poppins",
                        fontSize: "20px",
                        fontWeight: "400",
                        marginLeft: "50px",
                        color: "white"  // Make the text white
                     }}>
                        GreenNest is an e-commerce website dedicated to houseplants, offering a diverse selection of indoor greenery to enhance your living spaces. Whether you're a seasoned plant enthusiast or just starting, GreenNest provides an array of houseplants, from easy-to-care-for succulents to rare tropical varieties.                   
                        </Typography>
                     <Link to="/explore" style={{ textDecoration: "none" }}>
                        <Button variant="contained" sx={{
                           backgroundColor: "#007F12",
                           color: "white",
                           fontWeight: "600",
                           fontSize: "16px",
                           borderRadius: "10px",
                           padding: "10px 30px",
                           marginLeft: "50px",
                           marginTop: "5%",
                           '&:hover': {
                              backgroundColor: "#005A0E", // Change to your desired hover color
                            },
                        }}>
                           Get Started
                        </Button>
                     </Link>
                  </div>
               </div>
            </Container>
         </div>

         <Box sx={{ flexGrow: 1, padding: '20px', width: '80%', margin: '100px auto' }}>
            <Grid container direction='row' justifyContent="space-around" alignItems='center' sx={{ marginLeft: '80px' }}>
               {teaProducts.map((product) => (
                  <Grid key={product.id} item xs={12} sm={6} md={4}>
                     <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: '15px' }} >
                        <CardMedia
                           component="img"
                           height="140"
                           image={product.imageUrl}
                           alt={product.title}
                        />
                        <CardContent>
                           <Typography gutterBottom variant="h5" component="div">
                              {product.title}
                           </Typography>
                           <Typography variant="body2" color="text.secondary">
                              {product.description}   
                           </Typography>
                        </CardContent>
                        <Link style={{ textDecoration: 'none', marginBottom: '20px' }}>
                           <Button variant="contained" size="small" style={{ backgroundColor: "#005A0E", color: "white", fontWeight: "600", fontSize: "13px", borderRadius: "10px", padding: "5px 20px", margin: "15px 0px" }}>
                              Read More
                           </Button>
                        </Link>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         </Box>
      </div>
   );
};

export default Home;
