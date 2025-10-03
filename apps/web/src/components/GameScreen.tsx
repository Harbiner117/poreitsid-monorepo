"use client";

import { useEngine } from "../hooks/useEngine";

// simple local card renderer matching the HTML classes
function HtmlCard({ card, onClick, dead = false }: { card: any; onClick?: () => void; dead?: boolean }) {
  if (!card) return null;
  const suitMap: Record<string,string> = { "":"hearts", "":"diamonds", "":"spades", "":"clubs" };
  const suitCls = suitMap[card.suit] ?? "spades";
  const cls = ["card", `card--${suitCls}`, dead ? "card--dead" : ""].filter(Boolean).join(" ");
  return (
    <div className={cls} onClick={onClick} title={`${card.rank}${card.suit}`}>
      {card.rank}{card.suit}
    </div>
  );
}

export default function GameScreen() {
  const { state, dispatch } = useEngine();
  const me = 0 as const;
  const ai = 1 as const;

  // derived
  const trumpSuit = (state as any).trumpSuit ?? (state as any).trump ?? "-";
  const deckCount = Array.isArray((state as any).drawPile) ? (state as any).drawPile.length : ((state as any).deck?.length ?? 0);
  const phase = (state as any).phase ?? "PLAYING";
  const turn = (state as any).turn ?? 0;
  const dealer = (state as any).dealer ?? null;
  const indicatorCard = (state as any).indicatorCard ?? null;

  const players = (state as any).players || { 0: { hand: [], dead: [], used: [], scoring: { weddings:[], fourOfAKind:[], fiftyPoint:[], trumpSet25:[] }, points: 0 },
                                               1: { hand: [], dead: [], used: [], scoring: { weddings:[], fourOfAKind:[], fiftyPoint:[], trumpSet25:[] }, points: 0 } };

  const p0 = players[0]; const p1 = players[1];

  const playFromHand = (card: any) => {
    dispatch({ type: "PLAY_CARD", player: me, card });
  };

  const resolveTrick = () => dispatch({ type: "RESOLVE_TRICK" });
  const enterKim    = () => dispatch({ type: "ENTER_KIM" });

  const notImpl = (msg: string) => () => alert(msg + " (UI only for now)");

  return (
    <div className="game-container">
      <header className="header">
        <h1> Poreitsid Card Game</h1>
        <p>Ultimate Optimized Version</p>
      </header>

      <div className="controls">
        <button className="btn" onClick={notImpl("New Game")}> New Game</button>
        <button className="btn" onClick={notImpl("Deal Cards")}> Deal Cards</button>
        <button className="btn btn--secondary" onClick={notImpl("AI Demo")}> AI Demo</button>
        <button className="btn" onClick={notImpl("Rules")}> Rules</button>
        <button className="btn btn--danger" onClick={notImpl("Stress Test")}> Stress Test</button>
      </div>

      <div className="status-panel">
        <div className="status-item">Trump: <span id="trumpSuit">{trumpSuit || "-"}</span></div>
        <div className="status-item">Deck: <span id="deckCount">{deckCount}</span> cards</div>
        <div className="status-item">Phase: <span id="currentPhase">{phase}</span></div>
        <div className="status-item">Turn: <span id="turnIndicator">{turn === 0 ? "Player 1" : "Player 2"}</span></div>
        <div className="status-item" style={{display: dealer == null ? "none" : "block"}}>
          Dealer: <span id="dealerInfo">{dealer === 0 ? "Player 1" : "Player 2"}</span>
        </div>
      </div>

      <section className="battle-section">
        <h2> Battle Arena</h2>
        <div id="battleInstruction" className="battle-instruction">
          {phase === "PLAYING" ? "Select a card to play!" : "Click Resolve Battle to continue"}
        </div>
        <div className="battle-cards">
          <div className="battle-slot" id="player1BattleSlot">
            <div style={{fontSize: ".8rem", color:"#8aa89a", marginBottom: 8}}>Player 1</div>
            {/* render your board play if available */}
            {(state as any).currentTrick?.plays?.find((p:any)=>p.player===0)?.card &&
              <HtmlCard card={(state as any).currentTrick.plays.find((p:any)=>p.player===0).card} />
            }
          </div>

          <div className="trump-card-slot" id="trumpCardSlot" style={{display: indicatorCard ? "flex" : "none"}}>
            <div className="card trump-card" id="trumpCardDisplay">
              <span id="trumpCardText">{indicatorCard ? `${indicatorCard.rank}${indicatorCard.suit}` : "?"}</span>
            </div>
          </div>

          <div className="battle-slot" id="player2BattleSlot">
            <div style={{fontSize: ".8rem", color:"#8aa89a", marginBottom: 8}}>Player 2</div>
            {(state as any).currentTrick?.plays?.find((p:any)=>p.player===1)?.card &&
              <HtmlCard card={(state as any).currentTrick.plays.find((p:any)=>p.player===1).card} />
            }
          </div>
        </div>

        <button className="btn" onClick={resolveTrick}> Resolve Battle</button>
      </section>

      {/* Player 1 */}
      <section className={"player-section " + ((turn===0) ? "player-section--active" : "")} id="player1Area">
        <header className="player-header">
          <h2 className="player-name"> Player 1</h2>
          <div className="player-stats">
            <div className="stat-item">Score: <span className="stat-value">{p0.points ?? 0}</span></div>
            <div className="stat-item">Hand: <span className="stat-value">{p0.hand?.length ?? 0}</span></div>
            <div className="stat-item">Dead: <span className="stat-value">{p0.dead?.length ?? 0}</span></div>
          </div>
        </header>

        <div className="zones-grid">
          <div className="zone">
            <h3 className="zone__title"> Weddings</h3>
            <div className="zone__cards">{(p0.scoring?.weddings ?? []).flat().map((c:any)=><HtmlCard key={c.id} card={c} />)}</div>
          </div>
          <div className="zone">
            <h3 className="zone__title"> Four of a Kind</h3>
            <div className="zone__cards">{(p0.scoring?.fourOfAKind ?? []).flat().map((c:any)=><HtmlCard key={c.id} card={c} />)}</div>
          </div>
          <div className="zone">
            <h3 className="zone__title"> 50 Point Combo</h3>
            <div className="zone__cards">{(p0.scoring?.fiftyPoint ?? []).flat().map((c:any)=><HtmlCard key={c.id} card={c} />)}</div>
          </div>
          <div className="zone">
            <h3 className="zone__title"> Royal Flush</h3>
            <div className="zone__cards">{(p0.scoring?.trumpSet25 ?? []).flat().map((c:any)=><HtmlCard key={c.id} card={c} />)}</div>
          </div>

          <div className="zone zone--hand">
            <h3 className="zone__title"> Cards in Hand</h3>
            <div className="zone__cards">
              {p0.hand?.map((c:any)=>(
                <HtmlCard key={c.id} card={c} onClick={() => playFromHand(c)} />
              ))}
            </div>
          </div>

          <div className="zone">
            <h3 className="zone__title"> Used Cards</h3>
            <div className="zone__cards">{p0.used?.map((c:any)=><HtmlCard key={c.id} card={c} />)}</div>
          </div>

          <div className="zone zone--dead">
            <h3 className="zone__title"> Dead Cards</h3>
            <div className="zone__cards">{p0.dead?.map((c:any)=><HtmlCard key={c.id} card={c} dead />)}</div>
          </div>
        </div>
      </section>

      {/* Player 2 */}
      <section className={"player-section " + ((turn===1) ? "player-section--active" : "")} id="player2Area">
        <header className="player-header">
          <h2 className="player-name"> Player 2</h2>
          <div className="player-stats">
            <div className="stat-item">Score: <span className="stat-value">{p1.points ?? 0}</span></div>
            <div className="stat-item">Hand: <span className="stat-value">{p1.hand?.length ?? 0}</span></div>
            <div className="stat-item">Dead: <span className="stat-value">{p1.dead?.length ?? 0}</span></div>
          </div>
        </header>

        <div className="zones-grid">
          <div className="zone">
            <h3 className="zone__title"> Weddings</h3>
            <div className="zone__cards">{(p1.scoring?.weddings ?? []).flat().map((c:any)=><HtmlCard key={c.id} card={c} />)}</div>
          </div>
          <div className="zone">
            <h3 className="zone__title"> Four of a Kind</h3>
            <div className="zone__cards">{(p1.scoring?.fourOfAKind ?? []).flat().map((c:any)=><HtmlCard key={c.id} card={c} />)}</div>
          </div>
          <div className="zone">
            <h3 className="zone__title"> 50 Point Combo</h3>
            <div className="zone__cards">{(p1.scoring?.fiftyPoint ?? []).flat().map((c:any)=><HtmlCard key={c.id} card={c} />)}</div>
          </div>
          <div className="zone">
            <h3 className="zone__title"> Royal Flush</h3>
            <div className="zone__cards">{(p1.scoring?.trumpSet25 ?? []).flat().map((c:any)=><HtmlCard key={c.id} card={c} />)}</div>
          </div>

          <div className="zone zone--hand">
            <h3 className="zone__title"> Cards in Hand</h3>
            <div className="zone__cards">
              {p1.hand?.map((c:any)=>(<HtmlCard key={c.id} card={c} />))}
            </div>
          </div>

          <div className="zone">
            <h3 className="zone__title"> Used Cards</h3>
            <div className="zone__cards">{p1.used?.map((c:any)=><HtmlCard key={c.id} card={c} />)}</div>
          </div>

          <div className="zone zone--dead">
            <h3 className="zone__title"> Dead Cards</h3>
            <div className="zone__cards">{p1.dead?.map((c:any)=><HtmlCard key={c.id} card={c} dead />)}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
