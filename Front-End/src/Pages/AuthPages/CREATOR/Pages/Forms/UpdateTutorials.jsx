import React, { useState, useEffect } from 'react';
import {
    Container, TextField, Select, MenuItem, Button, IconButton, Box, Typography, InputLabel, FormControl, Grid, CircularProgress
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTutorials, updateTutorial } from '@/Redux/authActions';

const UpdateTutorials = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { baseUrl,tutorials, user, categories, loading } = useSelector(state => state.auth);

    const tutorial = tutorials.find(t => t.id === parseInt(id));
    console.log(tutorial);
    const [cover, setCover] = useState(tutorial?.cover || null);
    const [coverPreview, setCoverPreview] = useState(tutorial ? `${baseUrl}storage/${tutorial.cover}` : null);
    const [media, setMedia] = useState(tutorial?.media || [{ file: null, description: '', preview: null }]);
    const [selectedCategory, setSelectedCategory] = useState(tutorial?.sub_category?.category_id || '');
    const [selectedSubcategory, setSelectedSubcategory] = useState(tutorial?.sub_category?.id || '');
    const [titre, settitre] = useState(tutorial?.titre || '');
    const [description, setDescription] = useState(tutorial?.description || '');
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);

    useEffect(() => {
        dispatch(getTutorials());
    }, [dispatch]);

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

    const handleRemoveMedia = (index) => {
        const newMedia = media.filter((_, i) => i !== index);
        setMedia(newMedia);
    };

    const handleBack = () => {
        navigate('/creator/gestion-tutorials');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('Sub_Category_id', selectedSubcategory);
        formData.append('user_id', user.id);
        formData.append('description', description);

        if (cover && cover !== tutorial.cover) {
            formData.append('cover', cover);
        }

        media.forEach((m, index) => {
            if (m.file && m.file !== tutorial.media[index]?.file) {
                formData.append(`media[${index}][file]`, m.file);
                formData.append(`media[${index}][description]`, m.description);
                formData.append(`media[${index}][order]`, index);
            }
        });

        dispatch(updateTutorial(id, formData))
            .then(() => {
                navigate('/creator/gestion-tutorials');
            })
            .catch((error) => {
                console.error('Error updating tutorial:', error);
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
                Update Tutorial
            </Typography>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            ) : (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Titre"
                        value={titre}
                        onChange={(e) => settitre(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Catégorie</InputLabel>
                        <Select
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Sous-catégorie</InputLabel>
                        <Select
                            value={selectedSubcategory}
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
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />
                    <Box mt={2} mb={2}>
                        <Typography variant="h6">Cover:</Typography>
                        {coverPreview && <img src={coverPreview} alt="Cover Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />}
                        <input type="file" onChange={handleCoverChange} />
                    </Box>
                    <Typography variant="h6">Media:</Typography>
                    {media.map((m, index) => (
                        <Box key={index} mb={2}>
                            <TextField
                                label="Description"
                                value={m.description}
                                onChange={(e) => handleMediaChange(index, e)}
                                fullWidth
                                margin="normal"
                            />
                            {m.preview && (
                                <Box mt={1}>
                                    {m.file && m.file.type.startsWith('image') ? (
                                        <img src={m.preview} alt={`Preview ${index}`} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                                    ) : (
                                        <video controls style={{ width: '100%', maxHeight: '300px' }}>
                                            <source src={m.preview} type={m.file.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </Box>
                            )}
                            <input type="file" name="file" onChange={(e) => handleMediaChange(index, e)} />
                            <IconButton onClick={() => handleRemoveMedia(index)}>
                                <Delete />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleAddMedia}
                    >
                        Add Media
                    </Button>
                    <Box mt={4}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Update Tutorial
                        </Button>
                    </Box>
                </form>
            )}
        </Container>
    );
};

export default UpdateTutorials;
