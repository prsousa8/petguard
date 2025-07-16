'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css'; // Mantenha este import para os estilos CSS globais

export default function Dispenser() {
    const [foodSensorData, setFoodSensorData] = useState<{
        nivel_bacia: number;
        nivel_reservatorio: number;
        modo_automatico?: boolean;
        servo_aberto?: boolean;
    } | null>(null);

    interface BebedouroData {
        nivel_agua: number;
        bomba_status: string;
        horario_agendado_ligar: string;
        horario_agendado_desligar: string;
        hora_atual_rtc: string;
    }
    const [bebedouroData, setBebedouroData] = useState<BebedouroData | null>(null);

    const [loadingFood, setLoadingFood] = useState(true);
    const [loadingBebedouro, setLoadingBebedouro] = useState(true);

    const [mode, setMode] = useState<boolean | null>(null);
    const [servoState, setServoState] = useState<boolean | null>(null);

    const [scheduleOnTime, setScheduleOnTime] = useState<string>('08:00');
    const [scheduleOffTime, setScheduleOffTime] = useState<string>('11:00');


    const FOOD_DISPENSER_IP = 'http://192.168.52.204/';
    const BEBEDOURO_IP = 'http://192.168.52.59/';

    const fetchFoodData = async () => {
        try {
            const res = await fetch(FOOD_DISPENSER_IP);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setFoodSensorData(data);
            setLoadingFood(false);
            if (typeof data.modo_automatico === 'boolean') {
                setMode(data.modo_automatico);
            }
            if (typeof data.servo_aberto === 'boolean') {
                setServoState(data.servo_aberto);
            }
        } catch (err) {
            console.error('Erro ao buscar dados do dispensador de ração:', err);
            setFoodSensorData(null);
            setLoadingFood(false);
        }
    };

    const fetchBebedouroData = async () => {
        try {
            const res = await fetch(BEBEDOURO_IP);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data: BebedouroData = await res.json();
            setBebedouroData(data);
            setLoadingBebedouro(false);
            if (data.horario_agendado_ligar) setScheduleOnTime(data.horario_agendado_ligar);
            if (data.horario_agendado_desligar) setScheduleOffTime(data.horario_agendado_desligar);
        } catch (err) {
            console.error('Erro ao buscar dados do bebedouro:', err);
            setBebedouroData(null);
            setLoadingBebedouro(false);
        }
    };

    const sendCommand = async (ip: string, endpoint: string, payload: object) => {
        try {
            const res = await fetch(`${ip}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Erro no servidor ESP32 (${res.status}): ${errorText}`);
            }
            const data = await res.json();
            console.log(`Comando '${endpoint}' enviado com sucesso:`, data);
            if (ip === FOOD_DISPENSER_IP) {
                fetchFoodData();
            } else if (ip === BEBEDOURO_IP) {
                fetchBebedouroData();
            }
        } catch (err) {
            console.error('Erro ao enviar comando:', err);
            if (err instanceof Error) {
                alert(`Erro ao enviar comando: ${err.message}. Verifique o console para mais detalhes.`);
            } else {
                alert(`Erro ao enviar comando: ${String(err)}. Verifique o console para mais detalhes.`);
            }
        }
    };

    useEffect(() => {
        fetchFoodData();
        fetchBebedouroData();
        const foodIntervalId = setInterval(fetchFoodData, 5000);
        const bebedouroIntervalId = setInterval(fetchBebedouroData, 5000);

        return () => {
            clearInterval(foodIntervalId);
            clearInterval(bebedouroIntervalId);
        };
    }, []);

    const RESERVOIR_ALERT_THRESHOLD = 20;
    const BOWL_ALERT_THRESHOLD = 10;
    const WATER_ALERT_THRESHOLD = 15;

    return (
        <div className="container">
            <header className="header">
                <h1>PetGuard - Monitoramento Completo</h1>
            </header>

            <main className="main-content">
                <section className="feed-status">
                    <h2>Status e Controle da Ração</h2>
                    <div className="iframe-wrapper-dis">
                        <iframe
                            src={FOOD_DISPENSER_IP}
                            title="Página do Bebedouro"
                            width="100%"
                            height="680px" // Altura MUITO AUMENTADA para tentar exibir tudo
                            style={{ border: 'none' }}
                            // scrolling="no" foi removido para permitir que as barras de rolagem apareçam se a altura for insuficiente.
                            // Se você *ainda* quer ocultar as barras de rolagem mesmo que o conteúdo seja cortado, adicione overflow: hidden no CSS do iframe-wrapper
                        >
                            Seu navegador não suporta iframes.
                        </iframe>
                    </div>
                    {!loadingBebedouro && bebedouroData && bebedouroData.nivel_agua <= WATER_ALERT_THRESHOLD && (
                        <p className="alert-message iframe-alert">ALERTA: Encher o reservatório do bebedouro!</p>
                    )}
                </section>

                <hr />

                {/* Seção para exibir a página do bebedouro via iframe com estilos aprimorados */}
                <section className="bebedouro-webpage">
                    <h2>Bebedouro</h2>
                    <div className="iframe-wrapper">
                        <iframe
                            src={BEBEDOURO_IP}
                            title="Página do Bebedouro"
                            width="100%"
                            height="860px" // Altura MUITO AUMENTADA para tentar exibir tudo
                            style={{ border: 'none' }}
                            // scrolling="no" foi removido para permitir que as barras de rolagem apareçam se a altura for insuficiente.
                            // Se você *ainda* quer ocultar as barras de rolagem mesmo que o conteúdo seja cortado, adicione overflow: hidden no CSS do iframe-wrapper
                        >
                            Seu navegador não suporta iframes.
                        </iframe>
                    </div>
                    {!loadingBebedouro && bebedouroData && bebedouroData.nivel_agua <= WATER_ALERT_THRESHOLD && (
                        <p className="alert-message iframe-alert">ALERTA: Encher o reservatório do bebedouro!</p>
                    )}
                </section>

            </main>

            <style jsx global>{`
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                    color: #333;
                    background-color: #f5f5f5;
                }
                .container {
                    max-width: 900px;
                    margin: 30px auto;
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header {
                    background-color: #007bff;
                    color: white;
                    padding: 25px 20px;
                    text-align: center;
                    border-bottom: 2px solid #0056b3;
                }
                .header h1 {
                    margin: 0;
                    font-size: 2.2rem;
                    letter-spacing: 1px;
                }
                .main-content {
                    padding: 30px;
                }
                .loading-message, .error-message {
                    text-align: center;
                    font-size: 1.1rem;
                    color: #555;
                    padding: 20px 0;
                }
                .error-message {
                    color: #d32f2f;
                    font-weight: bold;
                }
                .feed-status, .water-status, .control-section, .bebedouro-webpage {
                    margin-bottom: 30px;
                    background-color: #fff;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
                }
                .feed-status h2, .water-status h2, .control-section h2, .bebedouro-webpage h2 {
                    color: #007bff;
                    border-bottom: 2px solid #e0e0e0;
                    padding-bottom: 10px;
                    margin-top: 0;
                    margin-bottom: 20px;
                    font-size: 1.8rem;
                }
                .section-description {
                    text-align: center;
                    color: #666;
                    font-style: italic;
                    margin-bottom: 25px;
                }
                .sensor-data-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }
                hr {
                    border: none;
                    border-top: 1px solid #eee;
                    margin: 40px 0;
                }
                .control-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .mode-control, .servo-control {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                }
                .mode-control h3, .servo-control h3 {
                    margin: 0;
                    font-size: 1.3rem;
                    color: #444;
                }
                .mode-toggle-button, .servo-toggle-button {
                    padding: 12px 25px;
                    font-size: 1.1rem;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                    color: white;
                    width: 100%;
                    max-width: 300px;
                }
                .mode-auto {
                    background-color: #28a745;
                }
                .mode-auto:hover {
                    background-color: #218838;
                    transform: translateY(-2px);
                }
                .mode-manual {
                    background-color: #007bff;
                }
                .mode-manual:hover {
                    background-color: #0056b3;
                    transform: translateY(-2px);
                }
                .servo-open {
                    background-color: #dc3545;
                }
                .servo-open:hover {
                    background-color: #c82333;
                    transform: translateY(-2px);
                }
                .servo-closed {
                    background-color: #28a745;
                }
                .servo-closed:hover {
                    background-color: #218838;
                    transform: translateY(-2px);
                }
                .servo-message {
                    text-align: center;
                    color: #666;
                    font-style: italic;
                    margin-top: 10px;
                    font-size: 0.95rem;
                }

                .pump-scheduling-card {
                    background-color: #f0f0f0;
                    border-radius: 8px;
                    padding: 15px;
                    margin-top: 25px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .pump-scheduling-card h3 {
                    color: #007bff;
                    margin-top: 0;
                    margin-bottom: 15px;
                }
                .pump-scheduling-card p {
                    margin: 5px 0;
                    font-size: 1rem;
                }
                .schedule-inputs {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin: 20px 0;
                }
                .schedule-inputs label {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    font-weight: bold;
                    color: #555;
                }
                .schedule-inputs input[type="time"] {
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1rem;
                    margin-top: 5px;
                    width: 120px;
                }
                .update-schedule-button {
                    background-color: #007bff;
                    color: white;
                    padding: 12px 25px;
                    font-size: 1.1rem;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                    margin-top: 15px;
                }
                .update-schedule-button:hover {
                    background-color: #0056b3;
                    transform: translateY(-2px);
                }
                .iframe-alert {
                    margin-top: 20px;
                }

                /* Melhorias para o iframe */
                .iframe-wrapper {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    max-width: 500px;
                    margin: 0 auto;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    overflow: hidden; /* Mantido overflow: hidden para manter os cantos arredondados, mas o iframe interno agora é grande o suficiente */
                }
                .iframe-wrapper iframe {
                    display: block;
                    width: 100%;
                    height: 860px; /* Altura MUITO AUMENTADA */
                }

                .iframe-wrapper-dis iframe {
                    display: block;
                    width: 100%;
                    height: 680px; 
                }
            `}</style>
        </div>
    );
}