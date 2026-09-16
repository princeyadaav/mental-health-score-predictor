(() => {
  "use strict";

  const API_BASE = "https://mental-health-score-predictor-z0w9.onrender.com";

  const form = document.getElementById("predict-form");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");

  const stateIdle = document.getElementById("state-idle");
  const stateLoading = document.getElementById("state-loading");
  const stateResult = document.getElementById("state-result");
  const stateError = document.getElementById("state-error");

  const scoreNumberEl = document.getElementById("score-number");
  const scoreBandEl = document.getElementById("score-band");
  const scoreContextEl = document.getElementById("score-context");
  const riskScoreEl = document.getElementById("risk-score");
  const confidenceScoreEl = document.getElementById("confidence-score");
  const scoreReasonsEl = document.getElementById("score-reasons");
  const gaugeFill = document.getElementById("gauge-fill");
  const errorCopyEl = document.getElementById("error-copy");
  const resultGuideLink = document.getElementById("result-guide-link");
  const themeToggle = document.getElementById("theme-toggle");
  const downloadResultBtn = document.getElementById("download-result-btn");
  const shareResultBtn = document.getElementById("share-result-btn");
  const resultActionStatus = document.getElementById("result-action-status");

  const GAUGE_ARC_LENGTH = 314; // approx pi * r(100)

  // ---------------------------------------------------------
  // Theme preference
  // ---------------------------------------------------------
  function setTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    themeToggle.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
    themeToggle.setAttribute("title", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
  }

  const savedTheme = localStorage.getItem("mental-health-theme");
  setTheme(savedTheme === "dark");

  themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    setTheme(isDark);
    localStorage.setItem("mental-health-theme", isDark ? "dark" : "light");
  });

  // ---------------------------------------------------------
  // Draw tick marks on both gauges (0..10, every 2 units)
  // ---------------------------------------------------------
  function drawTicks() {
    document.querySelectorAll(".gauge-ticks").forEach((g) => {
      g.innerHTML = "";
      const cx = 120, cy = 140, rOuter = 100, rInner = 90;
      for (let i = 0; i <= 10; i += 2) {
        const angle = Math.PI - (i / 10) * Math.PI; // 180deg -> 0deg
        const x1 = cx + rOuter * Math.cos(angle);
        const y1 = cy - rOuter * Math.sin(angle);
        const x2 = cx + rInner * Math.cos(angle);
        const y2 = cy - rInner * Math.sin(angle);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1.toFixed(1));
        line.setAttribute("y1", y1.toFixed(1));
        line.setAttribute("x2", x2.toFixed(1));
        line.setAttribute("y2", y2.toFixed(1));
        g.appendChild(line);
      }
    });
  }
  drawTicks();

// ---------------------------------------------------------
// Form progress indicator
// ---------------------------------------------------------

const progressSteps = document.querySelectorAll(".progress-step");
const formSections = form.querySelectorAll("fieldset.group");

function updateProgress(stepNumber) {
  progressSteps.forEach((step, index) => {
    const currentStep = index + 1;

    step.classList.toggle("active", currentStep === stepNumber);
    step.classList.toggle("completed", currentStep < stepNumber);
  });
}

formSections.forEach((section, index) => {
  section.addEventListener("focusin", () => {
    updateProgress(index + 1);
  });

  section.addEventListener("click", () => {
    updateProgress(index + 1);
  });
});

  // ---------------------------------------------------------
  // Segmented control (stress_level) wiring
  // ---------------------------------------------------------
  const segGroup = document.getElementById("stress_level_group");
  const stressHiddenInput = document.getElementById("stress_level");
  segGroup.querySelectorAll(".seg-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      segGroup.querySelectorAll(".seg-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      stressHiddenInput.value = btn.dataset.value;
      clearFieldError(stressHiddenInput);
    });
  });

  // ---------------------------------------------------------
  // Field-level error helpers
  // ---------------------------------------------------------
  function fieldWrapper(input) {
    return input.closest(".field");
  }

  function setFieldError(input, message) {
    const wrap = fieldWrapper(input);
    if (!wrap) return;
    wrap.classList.add("field-error");
    const msgEl = wrap.querySelector(".error-msg");
    if (msgEl) msgEl.textContent = message;
  }

  function clearFieldError(input) {
    const wrap = fieldWrapper(input);
    if (!wrap) return;
    wrap.classList.remove("field-error");
    const msgEl = wrap.querySelector(".error-msg");
    if (msgEl) msgEl.textContent = "";
  }

  function clearAllErrors() {
    form.querySelectorAll(".field").forEach((f) => f.classList.remove("field-error"));
    form.querySelectorAll(".error-msg").forEach((m) => (m.textContent = ""));
  }

  // ---------------------------------------------------------
  // Client-side validation mirroring the StudentData model
  // ---------------------------------------------------------
  function validate(payload) {
    const errors = [];

    const numericChecks = [
      ["age", 10, 100],
      ["avg_daily_usage_hours", 0, 24],
      ["daily_unlocks", 0, Infinity],
      ["study_hours", 0, 24],
      ["physical_activity_hours", 0, 24],
      ["sleep_hours_per_night", 0, 24],
    ];

    numericChecks.forEach(([key, min, max]) => {
      const input = document.getElementById(key);
      const val = payload[key];
      if (val === "" || val === null || Number.isNaN(val)) {
        errors.push([input, "This field is required."]);
      } else if (val < min || val > max) {
        errors.push([input, `Must be between ${min} and ${max === Infinity ? "0+" : max}.`]);
      }
    });

    ["gender", "country", "academic_level", "most_used_platform", "purpose_of_use"].forEach((key) => {
      const input = document.getElementById(key);
      if (!payload[key] || String(payload[key]).trim() === "") {
        errors.push([input, "This field is required."]);
      }
    });

    if (!payload.stress_level) {
      errors.push([stressHiddenInput, "Pick a stress level."]);
    }

    return errors;
  }

  // ---------------------------------------------------------
  // Gather form data into the exact StudentData shape
  // ---------------------------------------------------------
  function collectPayload() {
    const fd = new FormData(form);
    return {
      age: fd.get("age") === "" ? NaN : parseInt(fd.get("age"), 10),
      gender: fd.get("gender") || "",
      country: (fd.get("country") || "").trim(),
      academic_level: fd.get("academic_level") || "",
      most_used_platform: fd.get("most_used_platform") || "",
      purpose_of_use: fd.get("purpose_of_use") || "",
      avg_daily_usage_hours: fd.get("avg_daily_usage_hours") === "" ? NaN : parseFloat(fd.get("avg_daily_usage_hours")),
      daily_unlocks: fd.get("daily_unlocks") === "" ? NaN : parseInt(fd.get("daily_unlocks"), 10),
      study_hours: fd.get("study_hours") === "" ? NaN : parseFloat(fd.get("study_hours")),
      physical_activity_hours: fd.get("physical_activity_hours") === "" ? NaN : parseFloat(fd.get("physical_activity_hours")),
      sleep_hours_per_night: fd.get("sleep_hours_per_night") === "" ? NaN : parseFloat(fd.get("sleep_hours_per_night")),
      stress_level: fd.get("stress_level") || "",
    };
  }

  // ---------------------------------------------------------
  // UI state switching
  // ---------------------------------------------------------
  function showState(name) {
    [stateIdle, stateLoading, stateResult, stateError].forEach((el) => (el.hidden = true));
    ({ idle: stateIdle, loading: stateLoading, result: stateResult, error: stateError }[name]).hidden = false;
  }

  function setSubmitting(isSubmitting) {
    submitBtn.disabled = isSubmitting;
    submitBtn.classList.toggle("loading", isSubmitting);
  }

  function bandFor(score) {
    if (score < 4) {
      return {
        label: "Danger Zone",
        context: "Your responses suggest elevated strain right now. Small shifts in sleep or screen time can go a long way.",
      };
    }
    if (score < 7) {
      return {
        label: "Warning Zone",
        context: "Your rhythm looks fairly steady, with some room to recover and reset.",
      };
    }
    return {
      label: "Balanced/Healthy",
      context: "Your habits point to a well-supported, resilient baseline. Keep it up.",
    };
  }

  function renderResult(score, details = {}) {
    const clamped = Math.max(0, Math.min(10, score));
    const fallback = bandFor(clamped);
    const label = details.prediction || fallback.label;
    const context = details.recommendation || fallback.context;

    scoreNumberEl.textContent = score.toFixed(2);
    scoreBandEl.textContent = label;
    scoreContextEl.textContent = context;
    resultGuideLink.href = `lifestyle.html?zone=${encodeURIComponent(label)}`;
    riskScoreEl.textContent = `Risk ${Number.isFinite(details.risk_score) ? details.risk_score : "—"}/100`;
    confidenceScoreEl.textContent = `Confidence ${Number.isFinite(details.confidence) ? Math.round(details.confidence * 100) : "—"}%`;
    scoreReasonsEl.replaceChildren(
      ...(Array.isArray(details.reasons) ? details.reasons : []).map((reason) => {
        const item = document.createElement("li");
        item.textContent = reason;
        return item;
      })
    );

    // reset then animate the arc fill on next frame
    gaugeFill.style.transition = "none";
    gaugeFill.style.strokeDashoffset = String(GAUGE_ARC_LENGTH);
    requestAnimationFrame(() => {
      gaugeFill.style.transition = "";
      const offset = GAUGE_ARC_LENGTH * (1 - clamped / 10);
      gaugeFill.style.strokeDashoffset = String(offset);
    });

    showState("result");
    
    progressSteps.forEach((step) => {
     step.classList.remove("active");
     step.classList.add("completed");
});
  }

  function renderError(label, copy) {
    errorCopyEl.textContent = `${label}: ${copy}`;
    showState("error");
  }

  function getResultText() {
    const score = scoreNumberEl.textContent.trim();
    const band = scoreBandEl.textContent.trim();
    const context = scoreContextEl.textContent.trim();
    if (!score || !band || band === "—") return null;
    return { score, band, context };
  }

  function setResultActionStatus(message) {
    resultActionStatus.textContent = message;
    window.setTimeout(() => {
      if (resultActionStatus.textContent === message) resultActionStatus.textContent = "";
    }, 4000);
  }

  function wrapCanvasText(context, text, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let line = "";
    words.forEach((word) => {
      const next = line ? `${line} ${word}` : word;
      if (context.measureText(next).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function downloadResult() {
    const result = getResultText();
    if (!result) {
      setResultActionStatus("Complete a prediction before downloading.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 760;
    const context = canvas.getContext("2d");
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#174E58");
    gradient.addColorStop(0.58, "#237C72");
    gradient.addColorStop(1, "#356B89");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(242,184,75,0.2)";
    context.beginPath();
    context.arc(1080, 80, 220, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#EAF3EE";
    context.font = "600 28px Inter, sans-serif";
    context.fillText("Student Social Media & Mental Health", 74, 86);
    context.fillStyle = "rgba(234,243,238,0.7)";
    context.font = "500 18px Inter, sans-serif";
    context.fillText("MENTAL HEALTH SIGNAL / RESULT", 76, 145);
    context.fillStyle = "#FFFFFF";
    context.font = "700 112px 'JetBrains Mono', monospace";
    context.fillText(result.score, 72, 290);
    context.fillStyle = "rgba(234,243,238,0.65)";
    context.font = "500 28px Inter, sans-serif";
    context.fillText("/10", 330, 288);
    context.fillStyle = "#FFF8E8";
    context.font = "italic 600 36px Fraunces, Georgia, serif";
    context.fillText(result.band, 76, 366);
    context.fillStyle = "rgba(234,243,238,0.82)";
    context.font = "400 22px Inter, sans-serif";
    wrapCanvasText(context, result.context, 1040).slice(0, 3).forEach((line, index) => {
      context.fillText(line, 76, 420 + index * 34);
    });
    context.strokeStyle = "rgba(234,243,238,0.28)";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(76, 570);
    context.lineTo(1124, 570);
    context.stroke();
    context.fillStyle = "rgba(234,243,238,0.72)";
    context.font = "400 18px Inter, sans-serif";
    context.fillText("For informational purposes only — not a clinical assessment.", 76, 630);
    context.fillStyle = "rgba(234,243,238,0.5)";
    context.font = "500 16px 'JetBrains Mono', monospace";
    context.fillText("MENTAL HEALTH SIGNAL", 76, 690);

    const link = document.createElement("a");
    link.download = "mental-health-signal-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setResultActionStatus("Result card downloaded.");
  }

  async function copyResultText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();
    if (!copied) throw new Error("Clipboard access is unavailable.");
  }

  async function shareResult() {
    const result = getResultText();
    if (!result) {
      setResultActionStatus("Complete a prediction before sharing.");
      return;
    }
    const shareText = `Student Social Media & Mental Health\nMental Health Signal: ${result.score}/10\nResult: ${result.band}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Mental Health Signal Result", text: shareText });
        setResultActionStatus("Result shared.");
      } else {
        await copyResultText(shareText);
        setResultActionStatus("Result copied to clipboard.");
      }
    } catch (error) {
      if (error.name !== "AbortError") setResultActionStatus("Could not share the result. Please try again.");
    }
  }

  // ---------------------------------------------------------
  // Parse FastAPI / Pydantic 422 error responses into
  // field-level messages where possible
  // ---------------------------------------------------------
  function applyServerValidationErrors(detail) {
    if (!Array.isArray(detail)) return false;
    let matched = false;
    detail.forEach((err) => {
      const field = Array.isArray(err.loc) ? err.loc[err.loc.length - 1] : null;
      const input = field ? document.getElementById(field) : null;
      const target = field === "stress_level" ? stressHiddenInput : input;
      if (target) {
        setFieldError(target, err.msg || "Invalid value.");
        matched = true;
      }
    });
    return matched;
  }

  // ---------------------------------------------------------
  // Submit handler
  // ---------------------------------------------------------
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearAllErrors();

    const payload = collectPayload();
    const clientErrors = validate(payload);

    if (clientErrors.length > 0) {
      clientErrors.forEach(([input, msg]) => input && setFieldError(input, msg));
      clientErrors[0][0]?.focus?.();
      return;
    }

    setSubmitting(true);
    showState("loading");

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 422) {
        const body = await res.json().catch(() => null);
        const matched = body && applyServerValidationErrors(body.detail);
        renderError(
          "Check your inputs",
          matched
            ? "The API rejected a few fields — details are marked on the form."
            : "The API rejected this submission. Please review your inputs and try again."
        );
        return;
      }

      if (!res.ok) {
        let detailMsg = `The API responded with status ${res.status}.`;
        const body = await res.json().catch(() => null);
        if (body && typeof body.detail === "string") detailMsg = body.detail;
        renderError("Prediction failed", detailMsg);
        return;
      }

      const data = await res.json();
      if (typeof data.predicted_mental_health_score !== "number") {
        renderError("Unexpected response", "The API responded, but the score was missing or malformed.");
        return;
      }

      renderResult(data.predicted_mental_health_score, data);
    } catch (err) {
      renderError(
        "Can't reach the server",
        `Couldn't connect to ${API_BASE}. Make sure the backend is running (uvicorn main:app --port 2200 --reload) and reachable from this page.`
      );
    } finally {
      setSubmitting(false);
    }
  });

  // live-clear errors as the user edits
  form.querySelectorAll("input, select").forEach((el) => {
    el.addEventListener("input", () => clearFieldError(el));
    el.addEventListener("change", () => clearFieldError(el));
  });

  resetBtn.addEventListener("click", () => {
    showState("idle");
  });

  downloadResultBtn.addEventListener("click", downloadResult);
  shareResultBtn.addEventListener("click", shareResult);

})();