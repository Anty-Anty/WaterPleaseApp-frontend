import React, { useState, useEffect } from "react";

import PlantsList from "../components/PlantsList";
import Map from "../components/Map";
import Modal from "../components/UIElements/Modal";
import AddPlant from "../components/AddPlant";
import EditMap from "../components/EditMap";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import ErrorModal from "../components/UIElements/ErrorModal";
import { useHttpClient } from "../components/hooks/http-hook";

import "./MainPage.css";

const MainPage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  /* =========================
     UI STATE
  ========================= */
  const [showAddItem, setShowAddItem] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditMap, setShowEditMap] = useState(false);
  const [editingPlantId, setEditingPlantId] = useState(null);

  /* =========================
     DATA STATE
  ========================= */
  const [plants, setPlants] = useState([]);

  const [map, setMap] = useState({
    columnsNumber: 0,
    selectedSquares: [],
  });

  // selected squares state
  const [selectedSquares, setSelectedSquares] = useState([]);
  // temp state while editing map
  const [tempSelectedSquares, setTempSelectedSquares] = useState([]);

  /* =========================
     FETCH MAP
  ========================= */
  useEffect(() => {
    const fetchMap = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/api/maps`,
          "GET"
        );

        setMap(responseData.map);
      } catch (err) {}
    };

    fetchMap();
  }, [sendRequest]);

  /* =========================
     SYNC MAP → STATE
  ========================= */
  useEffect(() => {
    if (Array.isArray(map.selectedSquares)) {
      setSelectedSquares(map.selectedSquares);
      setTempSelectedSquares(map.selectedSquares);
    }
  }, [map]);

  /* =========================
     FETCH PLANTS
  ========================= */
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/api/plants`,
          "GET"
        );
        setPlants(responseData.plantsList);
      } catch (err) {}
    };

    fetchPlants();
  }, [sendRequest]);

  /* =========================
     PLANTS CRUD (LOCAL UI)
  ========================= */
  const upsertPlantHandler = (plantData) => {
    setPlants((prev) => {
      const exists = prev.some((p) => p.id === plantData.id);
      return exists
        ? prev.map((p) => (p.id === plantData.id ? { ...p, ...plantData } : p))
        : [...prev, plantData];
    });
  };

  /* =========================
     MAP PATCH API
  ========================= */
  const updateMapHandler = async (updatedSquares) => {
    try {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/api/maps/editmap`,
        "PATCH",
        JSON.stringify({
          selectedSquares: updatedSquares,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      setMap(responseData.map);
      setSelectedSquares(responseData.map.selectedSquares);
    } catch (err) {}
  };

  /* =========================
     MAP EDITING
  ========================= */
  const showEditMapHandler = () => {
    setTempSelectedSquares(selectedSquares);
    setShowEditMap(true);
  };

  const squareClickHandler = (squareId) => {
    setTempSelectedSquares((prev) =>
      prev.includes(squareId)
        ? prev.filter((id) => id !== squareId)
        : [...prev, squareId]
    );
  };

  const submitMapHandler = async () => {
    await updateMapHandler(tempSelectedSquares);
    setShowEditMap(false);
  };

  const mapCancelHandler = () => {
    setTempSelectedSquares(selectedSquares);
    setShowEditMap(false);
  };

  const mapResetHandler = () => {
    setTempSelectedSquares([]);
  };

  /* =========================
     DRAG & DROP
  ========================= */
  const plantDropHandler = (squareIndex, plantId) => {
    setPlants((prev) =>
      prev.map((plant) => {
        if (plant.id === plantId) {
          return { ...plant, mapPosition: squareIndex };
        }
        if (plant.mapPosition === squareIndex) {
          return { ...plant, mapPosition: null };
        }
        return plant;
      })
    );
  };

  const removePlantFromSquare = (squareIndex) => {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.mapPosition === squareIndex
          ? { ...plant, mapPosition: null }
          : plant
      )
    );
  };

  /* =========================
     JSX
  ========================= */
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      <div className="main-container">
        {/* PLANTS LIST */}
        <div className="plants-list">
          <div className="plants-list-container">
            <PlantsList
              plants={plants}
              editingPlantId={editingPlantId}
              setEditingPlantId={setEditingPlantId}
              showDeleteModalHandler={() => setShowDeleteModal(true)}
              onUpdatePlant={upsertPlantHandler}
            />

            {!showAddItem && (
              <div className="plants-list-item">
                <button
                  className="add-plant-btn"
                  onClick={() => setShowAddItem(true)}
                >
                  add plant
                </button>
              </div>
            )}

            {showAddItem && (
              <AddPlant
                onSavePlant={upsertPlantHandler}
                closeAddModalHandler={() => setShowAddItem(false)}
              />
            )}

            <Modal
              show={showDeleteModal}
              onCancel={() => setShowDeleteModal(false)}
              footer={
                <>
                  <button type="button">delete</button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    cancel
                  </button>
                </>
              }
            >
              <p>Please confirm deletion.</p>
            </Modal>
          </div>
        </div>

        {/* MAP */}
        <div className="map">
          {showEditMap ? (
            <EditMap
              plants={plants}
              DUMMY_MAP={map}
              selectedSquares={tempSelectedSquares}
              squareClickHandler={squareClickHandler}
              submitMapHandler={submitMapHandler}
              mapCancelHandler={mapCancelHandler}
              mapResetHandler={mapResetHandler}
              onPlantDrop={plantDropHandler}
              onRemovePlant={removePlantFromSquare}
            />
          ) : (
            <Map
              plants={plants}
              selectedSquares={selectedSquares}
              showEditMapHandler={showEditMapHandler}
              DUMMY_MAP={map}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
