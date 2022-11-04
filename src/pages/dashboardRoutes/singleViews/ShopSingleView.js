import { Typography, Box, Grid, Avatar } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { db } from "../../../utils/firebase";
function ShopSingleView({ data, shopID, ownerID }) {

    const [shopData, setShopData] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", ownerID, 'shop', shopID), (doc) => {
            setShopData(doc.data());
        })
        return unsub;
    }, [shopID, ownerID])

    console.log(shopData)
    return (
        <Box sx={{
            padding: 5
        }}
            container component={Grid} justifyContent="center"
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
                <Box container component={Grid} justifyContent="center">
                    <Typography sx={{
                        fontSize: 40, 
                        fontWeight: 'bold',
                        letterSpacing: 1
                    }}> Shop Details</Typography>
                </Box>
                <Box container component={Grid} justifyContent="center" sx={{
                    marginTop: 3
                }}>
                    <Avatar sx={{ height: 300, width: 250 }} variant="square" src={shopData.imageShop} />
                </Box>
                <Box container component={Grid} justifyContent="center" sx={{
                    marginTop: 2
                }}>
                    <Typography sx={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        letterSpacing: 1
                    }}>
                        {shopData.businessName}
                    </Typography>
                </Box>
                <Box container component={Grid} justifyContent="space-between" sx={{
                    marginTop: 3,
                    width: 500,
                    boxShadow: 2,
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: '#F0F0F3'
                }}>
                    <Box>
                        <Typography sx={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            letterSpacing: 1
                        }}>
                            Shop ID
                        </Typography>
                        <Typography sx={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            letterSpacing: 1
                        }}>
                            {shopID.substring(0, 7)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            letterSpacing: 1
                        }}>
                            Seller ID
                        </Typography>
                        <Typography sx={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            letterSpacing: 1
                        }}>
                            {ownerID.substring(0, 7)}
                        </Typography>
                    </Box>
                </Box>
                <Box container component={Grid} 
                sx={{
                    marginTop: 3,
                    width: 500,
                    boxShadow: 2,
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: '#F0F0F3'
                }}>
                    <Box container component={Grid} justifyContent="space-between" sx={{
                        marginTop: 3,
                        width: 500
                    }}>
                        <Box>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                                Owner Name
                            </Typography>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                                {shopData.fullName}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                                Shop Location
                            </Typography>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                                {shopData.address}
                            </Typography>
                        </Box>
                    </Box>
                    <Box container component={Grid} justifyContent="space-between" sx={{
                        marginTop: 3,
                        width: 500
                    }}>
                        <Box>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                                Date Created
                            </Typography>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                                {moment(shopData.dateCreated).format("ll")}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                                Shop Contact
                            </Typography>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                                {shopData.contactNo}
                            </Typography>
                        </Box>
                    </Box>
                    <Box container component={Grid} justifyContent="space-between" sx={{
                        marginTop: 3,
                        width: 500
                    }}>
                        <Box>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                                Seller Contact
                            </Typography>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                                {shopData.phone}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                                Shop Verified
                            </Typography>
                            <Typography sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                letterSpacing: 1,
                                color: shopData.isShopVerified === true ? "green" : "red"
                            }}>
                                {shopData.isShopVerified === true ? "Yes" : "No"}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ShopSingleView;
