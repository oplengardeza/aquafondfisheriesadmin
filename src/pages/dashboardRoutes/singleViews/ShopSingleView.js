import { Typography, Box, Grid, Avatar, IconButton, Button, Divider } from "@mui/material";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { db } from "../../../utils/firebase";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
function ShopSingleView({ data, shopID, ownerID, walletData }) {
    const navigate = useNavigate()
    const [shopData, setShopData] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", ownerID, 'shop', shopID), (doc) => {
            setShopData(doc.data());
        })
        return unsub;
    }, [shopID, ownerID])

    const onBack = () => {
        navigate("/admin/users-info")
    }

    const handleVerify = async () => {
        const shopQuery = doc(db, "users", ownerID, "shop", shopID);
        const notifQuery = doc(db, "notifications", shopID);
        await setDoc(shopQuery, {
            isShopVerified: true,
            status: "verified"
        }, { merge: true }
        ).then(async () => {
            const shopsQuery = doc(db, "shops", shopID);
            await setDoc(shopsQuery, {
                isShopVerified: true,
                status: "verified"
            }, { merge: true }
            ).then(async () => {
                await setDoc(notifQuery, {
                    status: "verified"
                }, { merge: true })
            })
        })
    }

    const handleReject = async () => {
        const shopQuery = doc(db, "users", ownerID, "shop", shopID);
        const shopsQuery = doc(db, "shops", shopID);
        const notifQuery = doc(db, "notifications", shopID);
        await setDoc(shopQuery, {
            status: "rejected"
        }, { merge: true }
        ).then(() => {
            setDoc(shopsQuery, {
                status: "rejected"
            }, { merge: true }
            ).then(async () => {
                setDoc(notifQuery, {
                    status: "rejected",
                    shopID: shopID,
                    ownerID: ownerID,
                })
            })
        })
    }

    return (
        <Box>
            <IconButton sx={{ alignSelf: 'flex-start' }} onClick={onBack}>
                <ArrowBackIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <Box sx={{
                padding: 5,
                display: 'flex',
                flexDirection: 'row'
            }}
                container component={Grid} justifyContent="center"
            >
                <Box container component={Grid} justifyContent="center" sx={{ display: 'flex', flexDirection: 'column' }}>
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
                        <Avatar sx={{ height: 300, width: 600 }} variant="square" src={shopData.imageShop} />
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
                    <Divider sx={{ border: 1, borderColor: "#000", marginTop: 2 }} orientation='horizontal' />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, paddingRight: 5 }}>
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
                                    {shopData.shopLocation}
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
                                    Owner Contact
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
                                    Id type
                                </Typography>
                                <Typography sx={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    letterSpacing: 1
                                }}>
                                    <span style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        letterSpacing: 1,
                                        color: "green"
                                    }}>{shopData.typeofID}</span>
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
                        <Box container component={Grid} justifyContent="center" sx={{
                            marginTop: 3
                        }}>
                            <Avatar sx={{ height: 300, width: 250 }} variant="square" src={shopData.idImage} />
                        </Box>
                        {
                            shopData.isShopVerified === false ?
                                <Box container component={Grid} justifyContent="center" sx={{
                                    marginTop: 2,
                                    flexDirection: 'row'
                                }}>
                                    <Button variant='contained' color="success" disabled={shopData.status === "" ? false : true} onClick={handleVerify} sx={{ width: 100, fontWeight: 'bold', marginRight: 2 }}>Verify</Button>
                                    <Button variant='contained' color="error" disabled={shopData.status === "" ? false : true} onClick={handleReject} sx={{ width: 100, fontWeight: 'bold', marginLeft: 2 }}>Reject</Button>
                                </Box> : ""
                        }
                    </Box>
                </Box>
            </Box>
            {
                walletData.length === 0 ?
                    "" :
                    <>
                        <Box sx={{
                            padding: 5
                        }}>
                            <Divider sx={{ border: 1, borderColor: "#000", marginTop: 2 }} />
                        </Box>
                        <Box sx={{
                            padding: 5
                        }}
                            container component={Grid} justifyContent="center"
                        >
                            <Box container component={Grid} justifyContent="space-between" sx={{
                                marginTop: 3,
                                width: 600,
                                paddingLeft: 5
                            }}>
                                <Box>
                                    <Typography sx={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        letterSpacing: 1
                                    }}>
                                        Gcash Name
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        letterSpacing: 1
                                    }}>
                                        {walletData[0].data.accName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        letterSpacing: 1
                                    }}>
                                        Account Number
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        letterSpacing: 1,
                                        color: data.hasShop === true ? 'green' : 'red'
                                    }}>
                                        {walletData[0].data.accNumber}
                                    </Typography>
                                </Box>
                                <Box container component={Grid} justifyContent="center">
                                    <Avatar src={walletData[0].data.qrCode} sx={{ bgcolor: deepOrange[500], height: 400, width: 350, fontSize: 40, fontWeight: 'bold', boxShadow: 2, marginTop: 2 }} variant='rounded' />
                                </Box>
                            </Box>
                        </Box>
                    </>
            }
        </Box >
    );
}

export default ShopSingleView;
