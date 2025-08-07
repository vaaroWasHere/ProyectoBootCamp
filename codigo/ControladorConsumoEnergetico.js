class ControladorConsumoEnergetico {
  constructor() {
    this.nasaData = null;
    this.initialize();
  }

  async initialize() {
    await this.fetchNASAData();
    this.setupEventListeners();
  }

  async fetchNASAData() {
    try {
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() - 1);

      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 2);

      const formatDate = (date) => {
        return date.toISOString().split("T")[0].replace(/-/g, "");
      };

      const startStr = formatDate(startDate);
      const endStr = formatDate(endDate);

      const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&start=${startStr}&end=${endStr}&latitude=6.25&longitude=-75.5&format=JSON&community=RE`;

      console.log("Fetching NASA data from:", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.nasaData = await response.json();
      console.log("NASA data loaded successfully:", this.nasaData);
    } catch (error) {
      console.error("Error fetching NASA data:", error);
      this.showError(
        "Error al cargar datos de NASA. Por favor, intente más tarde."
      );
    }
  }

  setupEventListeners() {
    const form = document.getElementById("consumoForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.calculateRenewablePercentage();
      });
    }
  }

  calculateRenewablePercentage() {
    const consumoInput = document.getElementById("consumoKWh");
    const consumoKWh = parseFloat(consumoInput.value);

    if (!consumoKWh || consumoKWh <= 0) {
      this.showError("Por favor ingrese un consumo válido en kWh");
      return;
    }

    if (
      !this.nasaData ||
      !this.nasaData.properties ||
      !this.nasaData.properties.parameter
    ) {
      this.showError(
        "Datos de NASA no disponibles. Por favor, intente más tarde."
      );
      return;
    }

    const solarData = this.nasaData.properties.parameter.ALLSKY_SFC_SW_DWN;
    const solarValues = Object.values(solarData);
    const avgSolarRadiation =
      solarValues.reduce((sum, val) => sum + val, 0) / solarValues.length;

    const daysInMonth = 30;
    const monthlySolarEnergy = avgSolarRadiation * daysInMonth;

    const panelEfficiency = 0.15;
    const panelArea = 10; // m²
    const renewableEnergyGenerated =
      monthlySolarEnergy * panelEfficiency * panelArea;

    const energyPerPanel = monthlySolarEnergy * panelEfficiency * panelArea;
    const panelsNeeded = Math.ceil(consumoKWh / energyPerPanel);

    const renewablePercentage = Math.min(
      (renewableEnergyGenerated / consumoKWh) * 100,
      100
    );

    this.displayResults({
      consumoKWh: consumoKWh,
      renewablePercentage: renewablePercentage.toFixed(1),
      avgSolarRadiation: avgSolarRadiation.toFixed(2),
      renewableEnergyGenerated: renewableEnergyGenerated.toFixed(2),
    });
  }

  displayResults(results) {
    const resultsDiv = document.getElementById("resultados");
    if (!resultsDiv) return;

    resultsDiv.innerHTML = `
            <div class="result-card">
                <h3>Resultados de Energía Renovable</h3>
                <div class="result-item">
                    <span class="label">Tu consumo mensual:</span>
                    <span class="value">${results.consumoKWh} kWh</span>
                </div>
                <div class="result-item">
                    <span class="label">Radiación solar promedio:</span>
                    <span class="value">${
                      results.avgSolarRadiation
                    } kWh/m²/día</span>
                </div>
                <div class="result-item">
                    <span class="label">Energía renovable generable:</span>
                    <span class="value">${
                      results.renewableEnergyGenerated
                    } kWh/mes</span>
                </div>
                <div class="result-item highlight">
                    <span class="label">Porcentaje de energía renovable:</span>
                    <span class="value">${results.renewablePercentage}%</span>
                </div>
                <div class="recommendation">
                    ${this.getRecommendation(
                      parseFloat(results.renewablePercentage)
                    )}
                </div>
            </div>
        `;
  }

  getRecommendation(percentage) {
    if (percentage >= 80) {
      return "Tu consumo podria ser cubierto con energia solar";
    } else if (percentage >= 50) {
      return "Una parte significativa de tu consumo podria ser cubierta con energia solar";
    } else if (percentage >= 20) {
      return "Poco de tu consumo podria ser cubierto con energia solar";
    } else {
      return "El potencial de la radiacion solar es limitado";
    }
  }

  showError(message) {
    const resultsDiv = document.getElementById("resultados");
    if (resultsDiv) {
      resultsDiv.innerHTML = `<div class="error-message">${message}</div>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ControladorConsumoEnergetico();
});
