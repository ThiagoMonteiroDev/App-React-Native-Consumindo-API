// components/MovieSearch.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async () => {
        if (!query) return;

        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=bdad0b32`);
            setMovies(response.data.Search || []);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for a movie..."
                value={query}
                onChangeText={setQuery}
            />
            <Button title="Search" onPress={searchMovies} />
            <FlatList
                data={movies}
                keyExtractor={(item) => item.imdbID}
                renderItem={({ item }) => (
                    <View style={styles.movieItem}>
                        <Text style={styles.title}>{item.Title}</Text>
                        <Text>{item.Year}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    movieItem: {
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MovieSearch;

