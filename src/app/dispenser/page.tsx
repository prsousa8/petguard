'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css'; // Mantenha este import para os estilos CSS globais

// Componente de Barra de Progresso Reutilizável (sem alterações, assumindo que as correções anteriores foram aplicadas)
interface ProgressBarProps {
  label: string;
  percentage: number;
  alertThreshold: number;
  className?: string;
}

const ProgressBar = ({ label, percentage, alertThreshold, className = '' }: ProgressBarProps) => {
  let barColor = '#4CAF50';
  let textColor = '#212121';
  let message = '';
  let showMessage = false;

  if (percentage <= alertThreshold) {
    barColor = '#f44336';
    textColor = '#f44336';
    showMessage = true;
    if (label.includes('Reservatório')) {
      message = 'ALERTA: Pouca ração! Reabasteça!';
    } else {
      message = 'Tigela vazia. Dispensando ração.';
    }
  } else if (percentage < 50) {
    barColor = '#ff9800';
  }

  const fillerWidth = Math.max(0, Math.min(100, percentage));

  return (
    <div className={`progress-container ${className}`}>
      <div className="progress-header">
        <h3 style={{ color: textColor }}>{label}</h3>
        <span style={{ color: textColor }}>{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-filler" style={{ width: `${fillerWidth}%`, backgroundColor: barColor }}></div>
      </div>
      {showMessage && <p className="alert-message">{message}</p>}

      <style jsx>{`
        .progress-container {
          background-color: #f0f0f0;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .progress-header h3 {
          margin: 0;
          font-size: 1.2rem;
        }
        .progress-header span {
          font-weight: bold;
          font-size: 1.2rem;
        }
        .progress-bar {
          width: 100%;
          background-color: #e0e0e0;
          border-radius: 5px;
          height: 25px;
          overflow: hidden;
        }
        .progress-filler {
          height: 100%;
          border-radius: 5px;
          transition: width 0.5s ease-in-out, background-color 0.5s ease-in-out;
        }
        .alert-message {
          color: #f44336;
          font-weight: bold;
          margin-top: 10px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};


export default function Dispenser() {
    const [sensorData, setSensorData] = useState<{ 
        nivel_bacia: number; 
        nivel_reservatorio: number;
        modo_automatico?: boolean; // Adiciona modo_automatico ao tipo de dados do sensor
        servo_aberto?: boolean;    // Adiciona servo_aberto ao tipo de dados do sensor
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState<boolean | null>(null); // true para automático, false para manual
    const [servoState, setServoState] = useState<boolean | null>(null); // true para aberto, false para fechado

    const ESP32_IP = 'http://192.168.31.204/'; 

    const fetchData = async () => {
        try {
            const res = await fetch(ESP32_IP);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setSensorData(data);
            setLoading(false);
            // Atualiza o estado do modo e servo com base nos dados recebidos
            if (typeof data.modo_automatico === 'boolean') {
                setMode(data.modo_automatico);
            }
            if (typeof data.servo_aberto === 'boolean') {
                setServoState(data.servo_aberto);
            }
        } catch (err) {
            console.error('Erro ao buscar dados:', err);
            setSensorData(null);
            setLoading(false);
        }
    };

    // Função para enviar comandos ao ESP32
    const sendCommand = async (endpoint: string, payload: object) => {
        try {
            const res = await fetch(`${ESP32_IP}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' // Necessário para CORS no navegador
                },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Erro no servidor ESP32 (${res.status}): ${errorText}`);
            }
            const data = await res.json();
            console.log(`Comando '${endpoint}' enviado com sucesso:`, data);
            fetchData(); 
        } catch (err) {
            console.error('Erro ao enviar comando:', err);
            if (err instanceof Error) {
                alert(`Erro ao enviar comando: ${err.message}. Verifique o console para mais detalhes.`);
            } else {
                alert(`Erro ao enviar comando: ${String(err)}. Verifique o console para mais detalhes.`);
            }
        }
    };

    const toggleMode = () => {
        const newMode = !mode; // Inverte o modo atual
        const modeString = newMode ? "automatico" : "manual";
        sendCommand('mode', { modo: modeString });
    };

    const toggleServo = () => {
        // Só permite controlar o servo se estiver no modo manual
        if (mode) { // Se mode for true (automático)
            alert("Não é possível controlar o servo manualmente no modo automático.");
            return;
        }
        const newServoState = !servoState; // Inverte o estado do servo
        const acaoString = newServoState ? "abrir" : "fechar";
        sendCommand('servo', { acao: acaoString });
    };


    useEffect(() => {
        fetchData(); // Chama uma vez imediatamente
        const intervalId = setInterval(fetchData, 500); // Intervalo de atualização

        return () => clearInterval(intervalId);
    }, []);

    const RESERVOIR_ALERT_THRESHOLD = 20;
    const BOWL_ALERT_THRESHOLD = 10;

    return (
        <div className="container">
            <header className="header">
                <h1>PetGuard - Monitoramento de Ração</h1>
            </header>

            <main className="main-content">
                <section className="feed-status">
                    <h2>Status da Ração</h2>
                    {loading && <p className="loading-message">Carregando dados dos sensores...</p>}

                    {!loading && sensorData && (
                        <div className="sensor-data-cards">
                            <ProgressBar 
                                label="Nível da Ração na Tigela" 
                                percentage={sensorData.nivel_bacia} 
                                alertThreshold={BOWL_ALERT_THRESHOLD}
                            />
                            <ProgressBar 
                                label="Nível da Ração no Reservatório" 
                                percentage={sensorData.nivel_reservatorio} 
                                alertThreshold={RESERVOIR_ALERT_THRESHOLD}
                            />
                        </div>
                    )}

                    {!loading && !sensorData && (
                        <p className="error-message">Não foi possível obter os dados dos sensores. Verifique a conexão do ESP32.</p>
                    )}
                </section>

                <section className="control-section">
                    <h2>Controles</h2>
                    {loading ? (
                        <p>Carregando controles...</p>
                    ) : (
                        <div className="control-buttons">
                            <div className="mode-control">
                                <h3>Modo de Operação: {mode === true ? 'Automático' : (mode === false ? 'Manual' : 'Desconhecido')}</h3>
                                
                            </div>

                            {!mode && ( // Mostra o controle do servo apenas se estiver no modo manual
                                <div className="servo-control">
                                    <h3>Controle do Servo: {servoState ? 'Aberto' : 'Fechado'}</h3>
                                    
                                </div>
                            )}
                            {mode && ( // Mensagem no modo automático
                                <p className="servo-message">O controle manual do servo está desativado no modo automático.</p>
                            )}
                        </div>
                    )}
                </section>
            </main>

            <style jsx global>{`
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                    color: #333;
                     background-color: #ffffff;
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
                .feed-status {
                    margin-bottom: 30px;
                }
                .feed-status h2, .map-section h2, .other-features h2, .control-section h2 {
                    color: #007bff;
                    border-bottom: 2px solid #e0e0e0;
                    padding-bottom: 10px;
                    margin-top: 0;
                    margin-bottom: 20px;
                }
                .sensor-data-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }
                .map-section {
                    margin-bottom: 30px;
                }
                .leaflet-container {
                    height: 400px;
                    width: 100%;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .control-section {
                    margin-bottom: 30px;
                    background-color: #f0f0f0;
                    border-radius: 8px;
                    padding: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .control-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .mode-control, .servo-control {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #fff;
                }
                .mode-control h3, .servo-control h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    color: #444;
                }
                .mode-toggle-button, .servo-toggle-button {
                    padding: 10px 20px;
                    font-size: 1rem;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    color: white;
                    width: 100%;
                    max-width: 250px;
                }
                .mode-auto {
                    background-color: #28a745; /* Verde para automático */
                }
                .mode-manual {
                    background-color: #007bff; /* Azul para manual */
                }
                .servo-open {
                    background-color: #dc3545; /* Vermelho para aberto */
                }
                .servo-closed {
                    background-color: #28a745; /* Verde para fechado */
                }
                .mode-toggle-button:hover, .servo-toggle-button:hover {
                    opacity: 0.9;
                }
                .servo-message {
                    text-align: center;
                    color: #666;
                    font-style: italic;
                    margin-top: 10px;
                }


                .other-features {
                    margin-top: 30px;
                }
                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                }
                .feature-card {
                    background-color: #f9f9f9;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                }
                .feature-card h3 {
                    color: #0056b3;
                    margin-top: 0;
                    font-size: 1.3rem;
                    margin-bottom: 10px;
                }
                .feature-card p {
                    font-size: 0.95rem;
                    line-height: 1.5;
                    color: #666;
                }
            `}</style>
        </div>
    );
}