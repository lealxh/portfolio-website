<script lang="ts">
    import {
        addUserMessage,
        setTyping,
        addAssistantMessage,
    } from "$lib/stores/chat";

    const quickActions = [
        { label: "Ver proyectos", message: "¿Qué proyectos has desarrollado?" },
        { label: "Experiencia", message: "¿Cuál es tu experiencia?" },
        { label: "Contacto", message: "¿Cómo puedo contactarte?" },
    ];

    function handleQuickAction(message: string) {
        addUserMessage(message);

        // Simulate typing and response
        setTyping(true);
        setTimeout(() => {
            const responses: Record<string, string> = {
                "¿Qué proyectos has desarrollado?":
                    "He trabajado en proyectos de automatización como Content Engine y AI Message Assistant. Puedes ver más detalles en la sección de Proyectos.",
                "¿Cuál es tu experiencia?":
                    "Soy Enterprise Software Engineer en Globant, especializado en Frontend y automatización. Mira la sección de Experiencia para más detalles.",
                "¿Cómo puedo contactarte?":
                    "Puedes contactarme por email a lealxh@gmail.com o conectar conmigo en LinkedIn.",
            };

            const response =
                responses[message] ||
                "Gracias por tu mensaje. José suele responder en menos de 24 horas.";
            addAssistantMessage(response);
        }, 1500);
    }
</script>

<div class="px-4 py-2 border-t border-border-primary">
    <div class="flex gap-2 overflow-x-auto pb-2">
        {#each quickActions as action}
            <button
                onclick={() => handleQuickAction(action.message)}
                class="text-xs px-3 py-1.5 bg-bg-tertiary hover:bg-bg-secondary text-text-secondary rounded-full whitespace-nowrap transition-colors"
            >
                {action.label}
            </button>
        {/each}
    </div>
</div>
