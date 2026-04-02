import Debug "mo:base/Debug";

actor {
  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
