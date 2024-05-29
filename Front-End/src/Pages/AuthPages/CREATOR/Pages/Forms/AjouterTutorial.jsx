import React, { useState, useEffect } from 'react';
import {
    Container, TextField, Select, MenuItem, Button, IconButton, Box, Typography, InputLabel, FormControl, Grid, CircularProgress
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddTutorial, getTutorials } from '@/Redux/authActions';
import toast from 'react-hot-toast';

const AjouterTutorial = () => {
    const [cover, setCover] = useState(null);
    const { baseUrl, user, categories, authenticated, loading } = useSelector(state => state.auth);
    const [coverPreview, setCoverPreview] = useState(null);
    const [media, setMedia] = useState([{ file: null, description: '', preview: null }]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [titre, settitre] = useState('');
    const [description, setDescription] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const Dispatch = useDispatch()
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedCategory) {
            const category = categories.find(cat => cat.id === selectedCategory);
            setFilteredSubcategories(category ? category.subcategories : []);
        } else {
            setFilteredSubcategories([]);
        }
    }, [selectedCategory, categories]);

    const handleCoverChange = (event) => {
        const file = event.target.files[0];
        setCover(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setCoverPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleMediaChange = (index, event) => {
        const newMedia = [...media];
        if (event.target.name === 'file') {
            const file = event.target.files[0];
            newMedia[index].file = file;
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    newMedia[index].preview = e.target.result;
                    setMedia(newMedia);
                };
                reader.readAsDataURL(file);
            }
        } else {
            newMedia[index].description = event.target.value;
            setMedia(newMedia);
        }
    };

    const handleAddMedia = () => {
        setMedia([...media, { file: null, description: '', preview: null }]);
    };

    const handleBack = () => {
        navigate('/creator/gestion-tutorials');
    };

    const handleRemoveMedia = (index) => {
        const newMedia = media.filter((_, i) => i !== index);
        setMedia(newMedia);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('Sub_Category_id', selectedSubcategory);
        formData.append('user_id', user.id);
        formData.append('description', description);
    
        if (cover) {
            formData.append('cover', cover);
        }
    
        media.forEach((m, index) => {
            if (m.file) {
                formData.append(`media[${index}][file]`, m.file);
                formData.append(`media[${index}][description]`, m.description);
                formData.append(`media[${index}][order]`, index);
            }
        });
    
        // Convert FormData to a regular object
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
    
        Dispatch(AddTutorial(formData))
        .then(() => {
            settitre('');
            setDescription('');
            setSelectedCategory('');
            setSelectedSubcategory('');
            setCover(null);
            setCoverPreview(null);
            setMedia([{ file: null, description: '', preview: null }]);
            Dispatch(getTutorials());
        })
        .catch((error) => {
            console.error('Error creating tutorial:', error);
        });
    };
    
    return (
        <Container maxWidth="md">
            <Grid container justifyContent="left">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleBack}
                    startIcon={<ArrowBackIcon />}
                >
                    Retour
                </Button>
            </Grid>
            <Typography variant="h4" component="h1" gutterBottom>
                Add New Tutorial
            </Typography>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        border="1px dashed #ccc"
                        borderRadius="8px"
                        padding="16px"
                        marginBottom="16px"
                        bgcolor="#f9f9f9"
                    >
                        <Typography variant="h6" gutterBottom>
                            Tutorial Cover
                        </Typography>
                        <input
                            accept="image/*"
                            type="file"
                            name="cover"
                            onChange={handleCoverChange}
                            style={{ marginTop: 8 }}
                        />
                        {coverPreview && (
                            <Box mt={2}>
                                <img src={coverPreview} alt="Cover Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            </Box>
                        )}
                    </Box>
                    <TextField
                        label="Titre"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        value={titre}
                        onChange={(e) => settitre(e.target.value)}
                    />
                    <FormControl variant="outlined" fullWidth margin="normal" required>
                        <InputLabel>Category</InputLabel>
                        <Select
                            label="Category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="normal" required>
                        <InputLabel>Subcategory</InputLabel>
                        <Select label="Subcategory" value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                        >
                            {filteredSubcategories.map((subcategory) => (
                                <MenuItem key={subcategory.id} value={subcategory.id}>
                                    {subcategory.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Small Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        rows={2}
                        required
                        multiline
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {media.map((m, index) => (
                        <Box padding="16px" border="1px dashed #ccc" borderRadius="8px" key={index} mb={2} display="flex" alignItems="center">
                            <input
                                accept="image/*,video/*"
                                type="file"
                                name="file"
                                onChange={(event) => handleMediaChange(index, event)}
                                style={{ marginRight: 16 }}
                            />
                            {m.preview && (
                                <Box mr={3}>
                                    {m.file.type.startsWith('image/') ? (
                                        <img src={m.preview} alt="Media Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    ) : (
                                        <video src={m.preview} controls style={{ maxWidth: '200px', maxHeight: '100px' }} />
                                    )}
                                </Box>
                            )}
                            <TextField
                                label="Media Description"
                                variant="outlined"
                                name="description"
                                value={m.description}
                                onChange={(event) => handleMediaChange(index, event)}
                                multiline
                                rows={4}
                                style={{ marginRight: 16, flex: 1 }}
                            />
                            <IconButton sx={{ color: 'red' }} onClick={() => handleRemoveMedia(index)}>
                                <Delete />
                            </IconButton>
                        </Box>
                    ))}
                    <Button variant="outlined" onClick={handleAddMedia} startIcon={<Add />}>
                        Add Media
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: 16 }}
                    >
                        Submit
                    </Button>
                </form>
            )}
        </Container>
    );
};

export default AjouterTutorial;
